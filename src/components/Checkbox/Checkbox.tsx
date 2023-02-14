import React, { ReactNode } from "react";
import styles from "./Checkbox.module.css";
import { classes } from "../../utils";
import { ReactComponent as CheckIcon } from "../../icons/check.svg";

interface CheckboxProps {
  checked: boolean;
  children: ReactNode;
  onChange: (checked: boolean) => void;
}

const c = classes(styles);

const Checkbox: React.FC<CheckboxProps> = (props) => {
  const { checked, children, onChange } = props;
  return (
    <label className={c("container")}>
      <div className={c("outer", { checked })}>
        <CheckIcon className={c("icon", { checked })} viewBox="0 0 48 48" />
      </div>

      <input
        hidden
        checked={checked}
        type="checkbox"
        onChange={() => onChange(!checked)}
      />
      <div>{children}</div>
    </label>
  );
};

export default Checkbox;
