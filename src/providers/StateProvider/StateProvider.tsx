import React, { createContext, ReactNode, useReducer } from "react";
import { Action } from "./types";
import { LayerConfig } from "../../types";
import { SET_LAYER, SET_TOOLTIP } from "../../actions";
import { SET_LAYERS } from "../../actions/createSetLayers";
import { reduce } from "ramda";

interface StateProviderProps {
  children: ReactNode;
}

interface MapState {
  layers: Record<string, LayerConfig> | null;
  tooltip: string | null;
}

export interface State {
  map: MapState;
}

const initialState = { map: { layers: null, tooltip: null } };

export const StateContext = createContext<[State, any]>([
  initialState,
  () => {},
]);

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case SET_LAYER:
      return {
        ...state,
        map: {
          ...state.map,
          // @ts-ignore
          layers: { ...state.map.layers, [action.payload.id]: action.payload },
        },
      };
    case SET_LAYERS:
      return {
        ...state,
        map: {
          ...state.map,
          // @ts-ignore
          layers: reduce(
            // @ts-ignore
            (dictionary, next) => ({ ...dictionary, [next.id]: next }),
            {}
            // @ts-ignore
          )(action.payload),
        },
      };
    case SET_TOOLTIP:
      return { ...state, map: { ...state.map, tooltip: action.payload } };
    default:
      return state;
  }
};

const StateProvider: React.FC<StateProviderProps> = ({ children }) => {
  // @ts-ignore
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
