import React, { ReactElement, ReactNode } from "react";
import { Tab, TabProps } from "../Tab";
import { classes } from "../../utils";
import styles from "./Tabs.module.css";

export interface TabsProps<T> {
  children: ReactNode[];
  value: T;
  onChange: (value: T) => void;
}

export interface TabItemProps extends Pick<TabProps, "label" | "value"> {}

const Tabs = <T,>({ children, value, onChange }: TabsProps<T>) => {
  return (
    <div className={classes(styles)("container")}>
      {/*@ts-ignore*/}
      {children.map<ReactElement<TabProps>>(({ props }) => (
        <Tab
          key={props.label}
          active={props.value === value}
          label={props.label}
          value={props.value}
          onClick={() => onChange(props.value)}
        />
      ))}
    </div>
  );
};

Tabs.Item = (props: TabItemProps) => <Tab {...props} />;

export default Tabs;
