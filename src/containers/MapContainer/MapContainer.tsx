import React, { forwardRef, useState } from "react";
import Map, { MapRef } from "react-map-gl";
import maplibregl from "maplibre-gl";
import DeckGL, { DeckGLProps } from "@deck.gl/react/typed";
import {
  _SunLight as SunLight,
  AmbientLight,
  LightingEffect,
} from "@deck.gl/core/typed";
import { BikeWay, PickingInfo } from "../../types";
import { useStore } from "../../providers";
import { createTooltip } from "../../utils";

interface MapContainerProps extends DeckGLProps {
  mapStyle?: string;
}

const MAP_STYLE =
  "https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json";

const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 1.0,
});

const dirLight = new SunLight({
  timestamp: Date.UTC(2019, 7, 1, 22),
  color: [255, 255, 255],
  intensity: 1.0,
  _shadow: true,
});

const MapContainer = forwardRef<MapRef, MapContainerProps>(
  ({ mapStyle = MAP_STYLE, ...deckGLProps }, ref) => {
    const [tooltip] = useStore((state) => state.map.tooltip);

    const [effects] = useState(() => {
      const lightingEffect = new LightingEffect({ ambientLight, dirLight });
      lightingEffect.shadowColor = [0, 0, 0, 0.5];
      return [lightingEffect];
    });

    return (
      <DeckGL
        controller
        effects={effects}
        style={{ position: "relative" }}
        getTooltip={createTooltip(tooltip)}
        {...deckGLProps}
      >
        <Map
          reuseMaps
          ref={ref}
          attributionControl={false}
          mapLib={maplibregl}
          mapStyle={mapStyle}
        />
      </DeckGL>
    );
  }
);

export default MapContainer;
