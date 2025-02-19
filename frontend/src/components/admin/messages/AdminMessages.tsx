import { useEffect, useState, useRef } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {Button,Box,CircularProgress,Typography,Paper,Divider,useMediaQuery,useTheme} from "@mui/material";
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

dayjs.extend(utc);
dayjs.extend(timezone);

export const UsernameCell: React.FC<{ userId: string }> = ({ userId }) => {
  const user = useQueryUserById(userId);
  return <>{user ? <> {user.userName}</> : "Loading..."}</>;
};

const AdminMessages: React.FC = () => {
  const { data, error, isLoading } = useMessages();
  const { mutate: updateMessageById } = useUpdateMessageById();
  const [userId, setUserId] = useState<string | null>(null);
  const [permissionType, setPermissionType] = useState<string | null>(null);
  const [isApproved, setIsApproved] = useState<boolean>(false);
  const prevUpdatedUser = useRef<IUser | null>(null);
  const { mutation, updatedUser } = useUpdateUserAuth(
    userId ?? "",
    permissionType ?? ""
  );
  const { mutate: updateUserAuth } = mutation;
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (userId && isApproved && !isLoading && updatedUser) {
      if (
        JSON.stringify(prevUpdatedUser.current) !== JSON.stringify(updatedUser)
      ) {
        updateUserAuth(updatedUser);
        prevUpdatedUser.current = updatedUser;
      }
    }
  }, [userId, isApproved, isLoading, updatedUser, updateUserAuth]);

  /**
   * Note: We expect to receive the full IMessage from the row.
   */
  const handleApproval = (message: IMessage, status: boolean) => {
    const newMessage: IMessage = {
      ...message,
      approved: status,
      // Assuming message has an "_id" field
      _id: message._id,
      read: true,
      dateClose: new Date(),
    };

    updateMessageById({ message: newMessage });

    if (status === true) {
      setUserId(message.userId);
      setPermissionType(message.actionType);
      setIsApproved(true);
    } else {
      setIsApproved(false);
    }
  };

  // Define grid columns. For the username, we use our helper component.
  const columns: GridColDef[] = [
    {
      field: "username",
      headerName: "Username",
      width: 130,
      renderCell: (params) => (
        <Typography variant="body2" sx={{align:'center'}}>
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
      renderCell: (params) => {
        const isClosed = params.row.dateClose !== "Open";
        if (isClosed) {
          return (
            <Typography
              variant="body2"
              sx={{
                color: params.row.approved ? "#28a745" : "#dc3545",
                fontWeight: "bold",
                textAlign: "center",
                width: "100%",
              }}
            >
              {params.row.approved ? "Approved" : "Declined"}
            </Typography>
          );
        }
        return (
          <Box display="flex" gap={1}>
            <Button
              variant="contained"
              color="success"
              onClick={() => handleApproval(params.row.originalMessage, true)}
            >
              Approve
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleApproval(params.row.originalMessage, false)}
            >
              Decline
            </Button>
          </Box>
        );
      },
    },
  ];

  // Map messages to rows while preserving the original message in each row.
  const rows =
    data?.map((message) => ({
      id: message._id.toString(),
      userId: message.userId,
      actionType: message.actionType,
      approved: message.approved,
      dateOpen: dayjs(message.dateOpen)
        .tz("Asia/Jerusalem")
        .format("MMM D, YYYY, hh:mm A"),
      dateClose: message.dateClose
        ? dayjs(message.dateClose)
            .tz("Asia/Jerusalem")
            .format("MMM D, YYYY, hh:mm A")
        : "Open",
      originalMessage: message,
    })) || [];

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height={400}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    toast.error(`Failed to fetch messages: ${error.message}`);
    return null;
  }

  return (
    <Box sx={{ width: "100%", p: 2 }}>
      {isSmallScreen ? (
        // Responsive view using Paper styled like the Users component
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
                backgroundColor:
                  row.dateClose !== "Open" ? "#f5f5f5" : "inherit",
                opacity: row.dateClose !== "Open" ? 0.8 : 1,
              }}
            >
              <Box display="flex" alignItems="center">
                <Typography variant="body2" fontWeight="bold">
                  <strong>Username:</strong>
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
      ) : (
        // Render as DataGrid on Larger Screens
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10]}
          disableRowSelectionOnClick
          getRowClassName={(params) =>
            params.row.dateClose !== "Open" ? "closed-row" : ""
          }
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

// import React from "react";
// import { Box } from "@mui/material";
// import { useTheme, useMediaQuery } from "@mui/material";
// import { IMessage } from "../../../types/message";
// import { formatDate } from "../../../utils/dateFormatter";
// import AdminMessagesGrid from "./AdminMessagesGrid";
// import { useQueryUserById } from "../../../hooks/users/useQueryUserbyId";
// import AdminMessagesPaperList from "./AdminMessagesPaperList";

// interface AdminMessagesProps {
//   messages: IMessage[];
//   updateMessage: (message: IMessage) => void;
// }

// const AdminMessages: React.FC<AdminMessagesProps> = ({ messages, updateMessage }) => {
//   const theme = useTheme();
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));


  
//   const rows = (messages ?? []).map((message) => ({
//     id: message._id.toString(),
//     userId: message.userId,
//     actionType: message.actionType,
//     approved: message.approved,
//     dateOpen: formatDate(message.dateOpen),
//     dateClose: message.dateClose ? formatDate(message.dateClose) : "Open",
//     originalMessage: message,
//   }));

//   return (
//     <Box sx={{ width: "100%", p: 2 }}>
//       {isSmallScreen ? (
//         <AdminMessagesPaperList rows={rows} updateMessage={updateMessage} />
//       ) : (
//         <AdminMessagesGrid rows={rows}  />
//       )}
//     </Box>
//   );
// };

// export default AdminMessages;
