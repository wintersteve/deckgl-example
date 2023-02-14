import Deck from "@deck.gl/core/typed";
import geojson from "geojson";
import { ViewState } from "react-map-gl";

export type FeatureCollection<P> = geojson.FeatureCollection<
  geojson.Geometry,
  P
>;

export type Feature<P> = geojson.Feature<geojson.Geometry, P>;

export interface LayerConfig {
  id: string;
  visible: boolean;
  subLayers?: LayerConfigs;
}

export type LayerConfigs = LayerConfig[];

export interface FeatureConfig {
  layers: LayerConfigs;
  viewState: Partial<ViewState>;
}

export interface PickingInfo<T = unknown>
  extends Omit<Deck.PickingInfo, "object"> {
  object?: Feature<T>;
}

export interface BikeWay {
  aaa_network: string;
  aaa_segment: string;
  bike_route_name: string;
  bikeway_direction: string;
  bikeway_type: string;
  construction_note: null;
  e_s_bound_type: string;
  notes: null;
  object_id: string;
  overall_direction: string;
  segment_length: 463.30140353;
  snow_removal: string;
  speed_limit: null;
  status: string;
  street_name: string;
  street_segment_type: string;
  subtype: string;
  surface_type: string;
  upgrade_year: null;
  vehicle_direction: string;
  w_n_bound_type: string;
  year_of_construction: string;
}

export interface Property {
  growth: number;
  valuePerParcel: number;
  valuePerSqm: number;
}

export interface WashRoom {
  coordinates: [number, number];
  name: string;
  summer_hours: string;
  winter_hours: string;
}
