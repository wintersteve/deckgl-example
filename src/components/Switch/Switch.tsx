import React, { ReactNode } from "react";
import styles from "./Switch.module.css";
import { classes } from "../../utils";

interface DrawerProps {
  checked: boolean;
  children: ReactNode;
  onChange: (checked: boolean) => void;
}

const c = classes(styles);

const Switch: React.FC<DrawerProps> = (props) => {
  const { checked, children, onChange } = props;

  return (
    <label className={c("container")}>
      <div className={c("outer", { checked })}>
        <div className={c("inner", { checked })} />
        <input
          hidden
          checked={checked}
          type="checkbox"
          onChange={() => onChange(!checked)}
        />
      </div>
      <div>{children}</div>
    </label>
  );
};

export default Switch;
