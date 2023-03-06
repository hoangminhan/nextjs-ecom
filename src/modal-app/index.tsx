import { ContextCustom } from "@/context";
import { Modal } from "antd";
import React, { useContext } from "react";
import ReactDOM from "react-dom";

interface modalAppProps {
  onClose: () => void;
  children: React.ReactNode;
}

const ModalApp = ({ children }: modalAppProps) => {
  const { currentModal } = useContext(ContextCustom);

  return ReactDOM.createPortal(
    <div>{children}</div>,
    document.getElementById("modal-root") as HTMLElement
  );
};
export default ModalApp;
