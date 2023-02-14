import { useEffect } from "react";
import { useDispatch } from "../providers";
import { LayerConfig } from "../types";
import { createSetLayer } from "../actions";

const useRegister = (layer: LayerConfig) => {
  const setLayer = useDispatch(createSetLayer);

  useEffect(() => {
    setLayer(layer);
    // eslint-disable-next-line
  }, []);
};

export default useRegister;
