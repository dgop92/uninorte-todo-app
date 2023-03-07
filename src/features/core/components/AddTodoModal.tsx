import React from "react";
import { BaseModal } from "../../../components/Modal";

interface AddTodoModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function AddTodoModal({ open, onClose, children }: AddTodoModalProps) {
  return (
    <BaseModal
      open={open}
      onClose={onClose}
      extraBaseStyles={{ maxWidth: 450, width: "95vw", p: 0 }}
    >
      {/* <ModalHeader title="Add Todo" onClose={onClose} /> */}
      {children}
    </BaseModal>
  );
}
