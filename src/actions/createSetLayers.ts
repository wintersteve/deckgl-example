import { ActionCreator } from "../providers";
import { LayerConfigs } from "../types";

export const SET_LAYERS = "SET_LAYERS";

const createSetLayers: ActionCreator<LayerConfigs | null> = (payload) => ({
  type: SET_LAYERS,
  payload,
});

export default createSetLayers;
