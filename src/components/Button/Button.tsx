import React, { ReactNode } from "react";
import styles from "./Button.module.css";
import { classes } from "../../utils";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  onClick: () => void;
}

const c = classes(styles);

const Button: React.FC<ButtonProps> = (props) => {
  const { children, className = "", onClick } = props;
  return (
    <button className={c("container") + " " + className} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
