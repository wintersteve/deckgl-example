import { colord } from "colord";
import { values } from "ramda";

export type Color = [number, number, number] | [number, number, number, number];

const color = (hex: string) =>
  [...values(colord(hex).toRgb()).slice(0, 3), 255] as Color;

export default color;
