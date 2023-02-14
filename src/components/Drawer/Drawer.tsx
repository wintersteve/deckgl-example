import React, { ReactNode } from "react";
import { ReactComponent as CloseIcon } from "../../icons/close.svg";
import { ReactComponent as OpenIcon } from "../../icons/widgets.svg";
import styles from "./Drawer.module.css";
import { classes } from "../../utils";
import { Button } from "../Button";

interface DrawerProps {
  body: ReactNode;
  header: ReactNode;
  open?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
}

const c = classes(styles);

const Drawer: React.FC<DrawerProps> = ({
  body,
  header,
  open,
  onClose,
  onOpen,
}) => {
  return (
    <>
      <div className={c("container", { closed: !open })}>
        <div className={c("header")}>
          {header}
          {onClose && (
            <Button onClick={onClose}>
              <CloseIcon className={c("icon")} viewBox="0 0 48 48" />
            </Button>
          )}
        </div>
        <div>{body}</div>
      </div>
      <div className={c("open-container", { open })}>
        {onOpen && (
          <Button className={c("open-button")} onClick={onOpen}>
            <OpenIcon className={c("icon")} viewBox="0 0 48 48" />
          </Button>
        )}
      </div>
    </>
  );
};

export default Drawer;
