import { Box, Button, Typography, Modal } from "@mui/material";
import { ConfirmModalProps } from "../../types/confirmModalProps";
import './ConfirmModal.scss';

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  onClose,
  onConfirm,
  type = "cancel",
}) => {
  const modalContent = () => {
    switch (type) {
      case "delete":
        return {
          title: "Are you sure you want to delete?",
          subtitle: "There's no way back",
          buttonText: "Yes, Delete",
        };
      case "cancel":
      default:
        return {
          title: "Are you sure you want to cancel?",
          subtitle: "Your changes won't be saved.",
          buttonText: "Yes, I want to go back",
        };
    }
  };

  const { title, subtitle, buttonText } = modalContent();

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      aria-live="assertive"
    >
      <Box className="confirm-modal">
        <Typography className="modal-title">{title}</Typography>
        {subtitle && <Typography className="modal-subtitle">{subtitle}</Typography>}
        <Box className="button-container">
          <Button onClick={onConfirm}>{buttonText}</Button>
          <Button onClick={onClose}>Cancel</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmModal;