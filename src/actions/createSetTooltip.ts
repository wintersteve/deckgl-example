import { ActionCreator } from "../providers";

export const SET_TOOLTIP = "SET_TOOLTIP";

const createSetTooltip: ActionCreator<string | null> = (payload) => ({
  type: SET_TOOLTIP,
  payload,
});

export default createSetTooltip;
