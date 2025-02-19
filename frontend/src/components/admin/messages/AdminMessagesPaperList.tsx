import React from "react";
import { Box, Paper, Typography, Button, Divider } from "@mui/material";
import { IMessage } from "../../../types/message";
import { UsernameCell } from "./AdminMessages";

interface AdminMessagesPaperListProps {
  rows: any[];
  updateMessage: (message: IMessage) => void;
}

const AdminMessagesPaperList: React.FC<AdminMessagesPaperListProps> = ({
  rows,
  updateMessage,
}) => {
  const handleApproval = (message: IMessage, status: boolean) => {
    updateMessage({ ...message, approved: status });
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {rows.map((row) => (
        <Paper
          key={row.id}
          sx={{
            width: "100%",
            p: 2,
            mb: 2,
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: row.dateClose !== "Open" ? "#f5f5f5" : "inherit",
            opacity: row.dateClose !== "Open" ? 0.8 : 1,
          }}
        >
          <Box display="flex" alignItems="center">
            <Typography variant="body2" fontWeight="bold">
              <strong>Username: </strong>
              <UsernameCell userId={row.userId} />
            </Typography>
          </Box>
          <Divider sx={{ my: 1 }} />
          <Typography variant="body2">
            <strong>Action Type:</strong> {row.actionType}
          </Typography>
          <Typography variant="body2">
            <strong>Open Date:</strong> {row.dateOpen}
          </Typography>
          <Typography variant="body2">
            <strong>Close Date:</strong> {row.dateClose}
          </Typography>
          <Box mt={2}>
            {row.dateClose !== "Open" ? (
              <Typography
                variant="body2"
                sx={{
                  color: row.approved ? "#28a745" : "#dc3545",
                  fontWeight: "bold",
                }}
              >
                {row.approved ? "Approved" : "Declined"}
              </Typography>
            ) : (
              <Box display="flex" gap={1}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleApproval(row.originalMessage, true)}
                >
                  Approve
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleApproval(row.originalMessage, false)}
                >
                  Decline
                </Button>
              </Box>
            )}
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default AdminMessagesPaperList;