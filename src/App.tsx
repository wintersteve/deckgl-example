import React, { FC, useState } from "react";
import { FlyToInterpolator, Layer, LayersList } from "deck.gl/typed";
import bikeways from "./data/bikeways.json";
import { filter, map, path, pipe, reduce, uniq, values } from "ramda";
import styles from "./App.module.css";
import { Drawer, TabPanel, Tabs } from "./components";
import {
  BikeWaysLayer,
  LandCoverLayer,
  PropertiesLayer,
  WashRoomLayer,
} from "./layers";
import { BikeWaysTab, MapContainer, PropertiesTab } from "./containers";
import { ViewState } from "react-map-gl";
import {
  BIKE_WAYS_LAYER_ID,
  WASH_ROOM_LAYER_ID,
  PROPERTIES_LAYER_ID,
  LAND_COVER_LAYER_ID,
} from "./layers";
import { FeatureConfig, LayerConfig, LayerConfigs } from "./types";
import { useDispatch, useStore } from "./providers";
import createSetLayers from "./actions/createSetLayers";

type Feature = "PROPERTIES" | "BIKE_ROADS";

const FEATURES: Record<"bikeRoads" | "properties", Feature> = {
  bikeRoads: "BIKE_ROADS",
  properties: "PROPERTIES",
};

const FEATURE_CONFIG: Record<Feature, FeatureConfig> = {
  BIKE_ROADS: {
    layers: [
      { id: BIKE_WAYS_LAYER_ID, visible: true },
      { id: WASH_ROOM_LAYER_ID, visible: false },
    ],
    viewState: { bearing: 0, pitch: 0, zoom: 11 },
  },
  PROPERTIES: {
    layers: [
      { id: PROPERTIES_LAYER_ID, visible: true },
      { id: LAND_COVER_LAYER_ID, visible: true },
    ],
    viewState: { bearing: -10, pitch: 45, zoom: 11.5 },
  },
};

const INITIAL_VIEW_STATE = {
  latitude: 49.254,
  longitude: -123.13,
  zoom: 11,
  maxZoom: 15,
  minZoom: 10,
  bearing: 0,
};

const bikeRoutesTypes = uniq(
  bikeways.features.map(({ properties }) => properties.bikeway_type)
);

const App: FC = () => {
  const [configs] = useStore((state) => state.map.layers) as LayerConfigs;

  const setLayers = useDispatch(createSetLayers);

  const [viewState, setViewState] =
    useState<Partial<ViewState>>(INITIAL_VIEW_STATE);

  const [tab, setTab] = useState<Feature>(FEATURES.bikeRoads);

  const [activeBikeTypes, setActiveBikeTypes] = useState<
    Record<string, boolean>
  >(
    reduce(
      (result, value) => ({ ...result, [value as string]: true }),
      {}
    )(bikeRoutesTypes)
  );

  const LAYERS_CONFIG: Record<string, Layer | null> = {
    [PROPERTIES_LAYER_ID]: PropertiesLayer(),
    [LAND_COVER_LAYER_ID]: LandCoverLayer(),
    [BIKE_WAYS_LAYER_ID]: BikeWaysLayer({ active: activeBikeTypes }),
    [WASH_ROOM_LAYER_ID]: WashRoomLayer(),
  };

  const layers = pipe(
    values,
    map((config: LayerConfig) => ({
      ...config,
      layer: LAYERS_CONFIG[config.id],
    })),
    filter(({ visible }: LayerConfig) => visible),
    map(path(["layer"]))
  )(configs) as LayersList;

  const handleTabChange = (tab: Feature) => {
    const { layers, viewState } = FEATURE_CONFIG[tab];
    setTab(tab);
    setLayers(layers);
    setViewState((prev) => ({
      ...prev,
      ...viewState,
      transitionDuration: 300,
      transitionInterpolator: new FlyToInterpolator(),
    }));
  };

  return (
    <div className={styles["container"]}>
      <MapContainer
        layers={layers}
        initialViewState={INITIAL_VIEW_STATE}
        viewState={viewState}
        onViewStateChange={(e) => setViewState(e.viewState)}
      />
      <Drawer
        open
        header={
          <Tabs value={tab} onChange={handleTabChange}>
            <Tabs.Item label="Bike Roads" value={FEATURES.bikeRoads} />
            <Tabs.Item label="Properties" value={FEATURES.properties} />
          </Tabs>
        }
        body={
          <>
            <TabPanel active={tab === FEATURES.bikeRoads}>
              <BikeWaysTab
                activeBikeWayTypes={activeBikeTypes}
                setActiveBikeWayTypes={setActiveBikeTypes}
              />
            </TabPanel>
            <TabPanel active={tab === FEATURES.properties}>
              <PropertiesTab />
            </TabPanel>
          </>
        }
      />
    </div>
  );
};

export default App;
