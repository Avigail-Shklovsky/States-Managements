import { Box, Button, Typography, Modal } from "@mui/material";

interface DeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  type: string;
}

const ConfirmModal: React.FC<DeleteModalProps> = ({
  open,
  onClose,
  onConfirm,
  type,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
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
          Are you sure you want to
          {type === "delete" ? " delete this state?" : " cancel?"}
          <Typography component="h2">
            {type === "cancel" ? " your changes won't be saved" : ""}
          </Typography>
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
            marginTop: 2,
          }}
        >
          <Button variant="contained" color="error" onClick={onConfirm}>
            {type === "delete" ? "Yes, Delete" : "yes, I want to go back"}
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
