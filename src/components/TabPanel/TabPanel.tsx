import React, { Fragment, ReactElement } from "react";

export interface TabPanelProps {
  active: boolean;
  children: ReactElement;
}

const TabPanel = ({ active, children }: TabPanelProps) => {
  return active ? children : <Fragment />;
};

export default TabPanel;
