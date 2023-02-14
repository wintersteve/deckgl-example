import React from "react";
import styles from "./Legend.module.css";
import { classes } from "../../utils";
import { filter } from "ramda";

export interface LegendItem {
  color: string;
  label: string;
}

export type LegendItems = LegendItem[];

interface LegendProps {
  items: LegendItems;
}

const c = classes(styles);

const Legend: React.FC<LegendProps> = ({ items }) => {
  return (
    <div className={c("container")}>
      <div className={c("legend-row")}>
        {items.map((item) => (
          <div
            key={item.label}
            className={c("legend")}
            style={{ backgroundColor: item.color }}
          />
        ))}
      </div>
      <div className={c("label-row")}>
        {items
          .filter((_, index) => index % 2 === 0)
          .map((item) => (
            <div key={item.label} className={c("label")}>{`${
              Number(item.label) * 100
            }%`}</div>
          ))}
      </div>
    </div>
  );
};

export default Legend;
