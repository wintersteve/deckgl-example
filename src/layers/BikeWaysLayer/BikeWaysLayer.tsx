import React, { useState } from "react";
import { LayerData } from "@deck.gl/core/typed";
import { GeoJsonLayer } from "@deck.gl/layers/typed";
import data from "../../data/bikeways.json";
import { color, Color } from "../../utils";
import { scaleOrdinal } from "d3-scale";
import { schemeSet3 } from "d3-scale-chromatic";
import { BikeWay, Feature, FeatureCollection } from "../../types";
import { uniq } from "ramda";
import { useDispatch } from "../../providers";
import BikeWaysToolTipTemplate from "./BikeWaysToolTipTemplate";
import { createSetTooltip } from "../../actions";
import { useRegister } from "../../hooks";

export interface BikeWaysLayerProps {
  active: Record<string, boolean>;
}

export const BIKE_WAYS_LAYER_ID = "bikeways";

const ATTRIBUTES = {
  type: "bikeway_type" as const,
  route: "bike_route_name" as const,
};

const bikeWays = data as FeatureCollection<BikeWay>;

const types = uniq(
  bikeWays.features.map(({ properties }) => properties[ATTRIBUTES.route])
);

const colors = scaleOrdinal(types).range(schemeSet3);

const BikeWaysLayer = ({ active }: BikeWaysLayerProps) => {
  useRegister({ id: BIKE_WAYS_LAYER_ID, visible: true });

  const setTooltip = useDispatch(createSetTooltip);

  const [hovered, setHovered] = useState<string | null>(null);

  return new GeoJsonLayer<Feature<BikeWay>>({
    data: bikeWays as unknown as LayerData<Feature<BikeWay>>,
    id: BIKE_WAYS_LAYER_ID,
    pickable: true,
    stroked: false,
    filled: false,
    parameters: { depthTest: false },
    getLineColor: ({ properties }) => {
      const route = properties?.[ATTRIBUTES.route];
      const lineColor = color(colors(route));
      if (!hovered) return lineColor;
      return route === hovered
        ? lineColor
        : ([...lineColor.slice(0, 3), 100] as Color);
    },
    getLineWidth: ({ properties }) =>
      active[properties[ATTRIBUTES.type]] ? 30 : 0,
    onHover: ({ object }) => {
      if (object?.properties) {
        setHovered(object.properties[ATTRIBUTES.route]);
        setTooltip(BikeWaysToolTipTemplate(object?.properties));
      } else {
        setHovered(null);
        setTooltip(null);
      }
    },
    transitions: { getLineColor: 250, getLineWidth: 250 },
    updateTriggers: { getLineWidth: active, getLineColor: hovered },
  });
};

export default BikeWaysLayer;
