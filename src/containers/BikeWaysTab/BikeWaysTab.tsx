import React from "react";
import { Checkbox, Switch } from "../../components";
import { path, reduce, uniq } from "ramda";
import bikeways from "../../data/bikeways.json";
import { useDispatch, useStore } from "../../providers";
import { createSetLayer } from "../../actions";
import { WASH_ROOM_LAYER_ID } from "../../layers";

interface BikeWaysTabProps {
  activeBikeWayTypes: Record<string, boolean>;
  setActiveBikeWayTypes: (types: Record<string, boolean>) => void;
}

const uniqueBikeWayTypes = uniq(
  bikeways.features.map(({ properties }) => properties.bikeway_type)
);

const subLayers = reduce(
  (result, value) => ({ ...result, [value as string]: true }),
  {}
)(uniqueBikeWayTypes);

const BikeWaysTab: React.FC<BikeWaysTabProps> = ({
  activeBikeWayTypes,
  setActiveBikeWayTypes,
}) => {
  const setLayer = useDispatch(createSetLayer);
  const [layer] = useStore((state) => state.map.layers?.[WASH_ROOM_LAYER_ID]);

  const handleToggle = () => {
    setLayer({ id: WASH_ROOM_LAYER_ID, visible: !layer.visible });
  };

  return (
    <>
      <h2>Vancouver Bike Roads</h2>
      <p>
        The property value of Vancouver, BC Height of polygons - average
        property value per square meter of lot Color - value growth from last
        assessment
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div>
          <h4>Types</h4>
          <div>
            {uniqueBikeWayTypes.map((type) => (
              <Checkbox
                key={type}
                checked={path([type], activeBikeWayTypes)}
                onChange={(checked) =>
                  setActiveBikeWayTypes({
                    ...activeBikeWayTypes,
                    [type]: checked,
                  })
                }
              >
                {type}
              </Checkbox>
            ))}
          </div>
        </div>
        <Switch checked={layer?.visible ?? false} onChange={handleToggle}>
          Show Restrooms
        </Switch>
      </div>
    </>
  );
};

export default BikeWaysTab;
