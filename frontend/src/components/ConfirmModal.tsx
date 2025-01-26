import { Box, Button, Typography, Modal } from "@mui/material";
import { ConfirmModalProps } from "../types/confirmModalProps";

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
          title: "Are you sure you want to delete this state?",
          subtitle: "",
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
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        {subtitle && <Typography component="p">{subtitle}</Typography>}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
            marginTop: 2,
          }}
        >
          <Button variant="contained" color="error" onClick={onConfirm}>
            {buttonText}
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmModal;
