import React from "react";
import { GeoJsonLayer } from "@deck.gl/layers/typed";
import { useFetch } from "../../hooks";
import { scaleThreshold } from "d3-scale";
import { Color } from "../../utils";
import { Feature, Property } from "../../types";
import { useDispatch, useStore } from "../../providers";
import { createSetTooltip } from "../../actions";
import PropertiesToolTipTemplate from "./PropertiesToolTipTemplate";
import { PROPERTY_CONFIG } from "../../configs";

export const PROPERTIES_LAYER_ID = "properties";

const DATA_URL =
  "https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/geojson/vancouver-blocks.json";

const COLOR_SCALE = scaleThreshold()
  .domain(PROPERTY_CONFIG.THRESHOLDS)
  .range(PROPERTY_CONFIG.COLORS as Iterable<number>);

const PropertiesLayer = () => {
  const { data } = useFetch(DATA_URL);

  const [layer] = useStore((state) => state.map.layers?.[PROPERTIES_LAYER_ID]);

  const setTooltip = useDispatch(createSetTooltip);

  return layer
    ? new GeoJsonLayer<Feature<Property>>({
        data,
        id: PROPERTIES_LAYER_ID,
        stroked: false,
        pickable: true,
        filled: true,
        extruded: true,
        wireframe: true,
        getElevation: ({ properties }: Feature<Property>) =>
          Math.sqrt(properties.valuePerSqm) * 10,
        getFillColor: ({ properties }: Feature<Property>) =>
          COLOR_SCALE(properties.growth) as unknown as Color,
        getLineColor: [255, 255, 255],
        onHover: ({ object }) => {
          if (object?.properties) {
            setTooltip(PropertiesToolTipTemplate(object?.properties));
          } else {
            setTooltip(null);
          }
        },
      })
    : null;
};

export default PropertiesLayer;
