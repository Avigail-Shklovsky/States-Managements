import React, { useEffect, useState, useRef } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Box,
  CircularProgress,
  Typography,
  Paper,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useMessages } from "../../hooks/messages/useMessages";
import { useQueryUserById } from "../../hooks/users/useQueryUserbyId";
import { useUpdateMessageById } from "../../hooks/messages/useUpdateMessageById";
import { useUpdateUserAuth } from "../../hooks/users/useUpdateUserAuth";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import toast from "react-hot-toast";
import { IMessage } from "../../types/message";
import { IUser } from "../../types/user";
import ApprovalActions from "../ApprovalActions";

dayjs.extend(utc);
dayjs.extend(timezone);

const formatDate = (date: Date | string | null | undefined): string => {
  return date ? dayjs(date).tz("Asia/Jerusalem").format("MMM D, YYYY, hh:mm A") : "Open";
};


const isMessageClosed = (message: IMessage): boolean => {
  return !!message.dateClose && dayjs(message.dateClose).isBefore(dayjs());
};


const UsernameCell: React.FC<{ userId: string }> = ({ userId }) => {
  const user = useQueryUserById(userId);
  return <>{user ? user.userName : "Loading..."}</>;
};


const AdminMessages: React.FC = () => {
  const { data, error, isLoading } = useMessages();
  const { mutate: updateMessageById } = useUpdateMessageById();

  const [userId, setUserId] = useState<string | null>(null);
  const [permissionType, setPermissionType] = useState<string | null>(null);
  const [isApproved, setIsApproved] = useState<boolean>(false);
  const { mutation, updatedUser } = useUpdateUserAuth(userId ?? "", permissionType ?? "");
  const { mutate: updateUserAuth } = mutation;
  const prevUpdatedUser = useRef<IUser | null>(null);

  useEffect(() => {
    if (userId && isApproved && !isLoading && updatedUser) {
      if (JSON.stringify(prevUpdatedUser.current) !== JSON.stringify(updatedUser)) {
        updateUserAuth(updatedUser);
        prevUpdatedUser.current = updatedUser;
      }
    }
  }, [userId, isApproved, isLoading, updatedUser, updateUserAuth]);


  const handleApproval = (message: IMessage, status: boolean) => {
    const newMessage: IMessage = {
      ...message,
      approved: status,
      _id: message._id,
      read: true,
      dateClose: new Date(),
    };

    updateMessageById({ message: newMessage });

    if (status) {
      setUserId(message.userId);
      setPermissionType(message.actionType);
      setIsApproved(true);
    } else {
      setIsApproved(false);
    }
  };

  const columns: GridColDef[] = [
    {
      field: "username",
      headerName: "Username",
      width: 130,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ textAlign: "center" }}>
          <UsernameCell userId={params.row.userId} />
        </Typography>
      ),
    },
    { field: "actionType", headerName: "Action Type", width: 130 },
    { field: "dateOpen", headerName: "Open Date", width: 180 },
    { field: "dateClose", headerName: "Close Date", width: 180 },
    {
      field: "approved",
      headerName: "Approve?",
      width: 200,
      align: "center",
      renderCell: (params) => (
        <ApprovalActions message={params.row.originalMessage} onApproval={handleApproval} />
      ),
    },
  ];

  const rows =
    data?.map((message) => ({
      id: message._id.toString(),
      userId: message.userId,
      actionType: message.actionType,
      approved: message.approved,
      dateOpen: formatDate(message.dateOpen),
      dateClose: message.dateClose ? formatDate(message.dateClose) : "Open",
      originalMessage: message,
      isClosed: isMessageClosed(message),
    })) || [];

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height={400}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    toast.error(`Failed to fetch messages: ${error.message}`);
    return null;
  }

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ width: "100%", p: 2 }}>
      {isSmallScreen ? (
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
                backgroundColor: row.isClosed ? "#f5f5f5" : "inherit",
                opacity: row.isClosed ? 0.8 : 1,
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
                <ApprovalActions message={row.originalMessage} onApproval={handleApproval} />
              </Box>
            </Paper>
          ))}
        </Box>
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          pageSizeOptions={[5, 10]}
          disableRowSelectionOnClick
          getRowClassName={(params) => (params.row.isClosed ? "closed-row" : "")}
          sx={{
            "& .closed-row": {
              backgroundColor: "#f5f5f5",
              opacity: 0.8,
            },
          }}
        />
      )}
    </Box>
  );
};

export default AdminMessages;
