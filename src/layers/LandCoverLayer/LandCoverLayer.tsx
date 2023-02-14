import React from "react";
import { PolygonLayer } from "@deck.gl/layers/typed";

export interface LandCoverLayerProps {}

export const LAND_COVER_LAYER_ID = "ground";

const data = [
  [
    [-120.0, 43.196],
    [-123.0, 51.324],
    [-123.306, 43.324],
    [-140.306, 49.196],
  ],
];

const LandCoverLayer = () => {
  return new PolygonLayer({
    data,
    id: LAND_COVER_LAYER_ID,
    stroked: false,
    getPolygon: (f) => f,
    getFillColor: [0, 0, 0, 0],
  });
};

export default LandCoverLayer;
