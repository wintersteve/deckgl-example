import { ActionCreator } from "./types";
import useStore from "./useStore";

const useDispatch = <T>(creator: ActionCreator<T>) => {
  const [_, dispatch] = useStore();
  return (payload: T) => dispatch(creator(payload));
};

export default useDispatch;
