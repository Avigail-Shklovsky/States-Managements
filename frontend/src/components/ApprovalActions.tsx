import React from "react";
import { Button, Typography, Box } from "@mui/material";
import dayjs from "dayjs";
import { IMessage } from "../types/message";

interface ApprovalActionsProps {
  message: IMessage;
  onApproval: (message: IMessage, status: boolean) => void;
}


const isMessageClosed = (message: IMessage): boolean => {
  return !!message.dateClose && dayjs(message.dateClose).isBefore(dayjs());
};

const ApprovalActions: React.FC<ApprovalActionsProps> = ({ message, onApproval }) => {
  const closed = isMessageClosed(message);

  if (closed) {
    return (
      <Typography
        variant="body2"
        sx={{
          color: message.approved ? "#28a745" : "#dc3545",
          fontWeight: "bold",
          textAlign: "center",
          width: "100%",
        }}
      >
        {message.approved ? "Approved" : "Declined"}
      </Typography>
    );
  }

  return (
    <Box display="flex" gap={1}>
      <Button variant="contained" color="success" onClick={() => onApproval(message, true)}>
        Approve
      </Button>
      <Button variant="contained" color="error" onClick={() => onApproval(message, false)}>
        Decline
      </Button>
    </Box>
  );
};

export default ApprovalActions;
