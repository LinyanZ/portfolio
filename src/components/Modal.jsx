import { createContext, useState, useContext, cloneElement } from "react";

const callAll = (...fns) => {
  return (...args) => fns.forEach((fn) => fn && fn(...args));
};

const ModalContext = createContext();

function Modal(props) {
  const [isOpen, setIsOpen] = useState(false);

  return <ModalContext.Provider value={[isOpen, setIsOpen]} {...props} />;
}

function ModalDismissButton({ children: child }) {
  const [, setIsOpen] = useContext(ModalContext);

  return cloneElement(child, {
    onClick: callAll(() => setIsOpen(false), child.props.onClick),
  });
}

function ModalOpenButton({ children: child }) {
  const [, setIsOpen] = useContext(ModalContext);

  return cloneElement(child, {
    onClick: callAll(() => setIsOpen(true), child.props.onClick),
  });
}

function ModalContentsBase(props) {
  const [isOpen] = useContext(ModalContext);

  if (!isOpen) return null;
  return <div {...props} />;
}

export { Modal, ModalDismissButton, ModalOpenButton, ModalContentsBase };
