export interface ConfirmModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    type?: "delete" | "cancel";
  }