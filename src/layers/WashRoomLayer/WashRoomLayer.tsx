import { IconLayer } from "@deck.gl/layers/typed";
import washrooms from "../../data/washrooms.json";
import icon from "../../icons/wc.svg";
import { useDispatch, useStore } from "../../providers";
import { createSetTooltip } from "../../actions";
import WashRoomToolTipTemplate from "./WashRoomToolTipTemplate";
import { WashRoom } from "../../types";
import { useRegister } from "../../hooks";

export interface WashRoomLayerProps {}

export const WASH_ROOM_LAYER_ID = "washrooms";

const ICON = {
  x: 0,
  y: 0,
  width: 128,
  height: 128,
  url: icon,
};

const WashRoomLayer = () => {
  useRegister({ id: WASH_ROOM_LAYER_ID, visible: false });

  const [layer] = useStore((state) => state.map.layers?.[WASH_ROOM_LAYER_ID]);

  const setTooltip = useDispatch(createSetTooltip);

  return new IconLayer<WashRoom>({
    id: WASH_ROOM_LAYER_ID,
    data: washrooms,
    pickable: true,
    transitions: { getSize: 250 },
    updateTriggers: { getSize: layer?.visible },
    getPosition: (d) => d.coordinates,
    getColor: [0, 219, 255],
    getIcon: () => ICON,
    getSize: () => (layer?.visible ? 12 : 0),
    onHover: ({ object }) => {
      if (object) {
        setTooltip(WashRoomToolTipTemplate(object));
      } else {
        setTooltip(null);
      }
    },
  });
};

export default WashRoomLayer;
