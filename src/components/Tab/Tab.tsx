import React from "react";
import styles from "./Tab.module.css";
import { classes } from "../../utils";

export interface TabProps {
  active?: boolean;
  label: string;
  value: string;
  onClick?: (tab: string) => void;
}

const Tab: React.FC<TabProps> = (props) => {
  const { active, label, value, onClick } = props;

  return (
    <div>
      <button
        className={classes(styles)("container", { active })}
        onClick={() => onClick?.(value)}
      >
        {label}
      </button>
    </div>
  );
};

export default Tab;
