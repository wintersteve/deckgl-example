import { useContext } from "react";
import { State, StateContext } from "./StateProvider";

export type Selector = (state: State) => any;

const useStore = (selector?: Selector) => {
  const [state, dispatch] = useContext(StateContext);

  return [selector ? selector(state) : state, dispatch];
};

export default useStore;
