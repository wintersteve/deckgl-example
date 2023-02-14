import { ActionCreator } from "../providers";
import { LayerConfig } from "../types";

export const SET_LAYER = "SET_LAYER";

const createSetLayer: ActionCreator<LayerConfig | null> = (payload) => ({
  type: SET_LAYER,
  payload,
});

export default createSetLayer;
