import React from "react";
import { Legend, LegendItems } from "../../components";
import { PROPERTY_CONFIG } from "../../configs";
import { map, pipe, zip } from "ramda";
import { classes, Color } from "../../utils";
import styles from "./PropertiesTab.module.css";

interface PropertiesTabProps {}

const toRgb = (color: Color) => `rgb(${color.slice(0, 3).join(",")})`;

const c = classes(styles);

const items = pipe(
  map<unknown, LegendItems>(([color, label]) => ({ color, label })),
  map(({ color, label }) => ({
    color: toRgb(color as unknown as Color),
    label,
  }))
)(zip(PROPERTY_CONFIG.COLORS, PROPERTY_CONFIG.THRESHOLDS));

const PropertiesTab: React.FC<PropertiesTabProps> = () => {
  return (
    <>
      <h2>Vancouver Property Value</h2>
      <p>
        The property value of Vancouver.
        <br /> Height of polygons reflects the property value per square meter.
        <br /> Color indicates the value growth since the last assessment.
      </p>
      <div className={c("container")}>
        <h4>Legend</h4>
        <Legend items={items} />
      </div>
    </>
  );
};

export default PropertiesTab;
