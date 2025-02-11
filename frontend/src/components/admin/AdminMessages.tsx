import { useEffect, useState, useRef } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button, Box, CircularProgress, Typography } from "@mui/material";
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

  const handleApproval = (message: IMessage, status: boolean) => {
    const newMessage: IMessage = {
      ...message,
      approved: status,
      //@ts-ignore
      _id: message.id,
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

  const columns: GridColDef[] = [
    { field: "userId", headerName: "User ID", width: 220 },
    {
      field: "username",
      headerName: "Username",
      width: 130,
      renderCell: (params) => {
        const user = useQueryUserById(params.row.userId);
        return user?.userName;
      },
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
              onClick={() => handleApproval(params.row, true)}
            >
              Approve
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleApproval(params.row, false)}
            >
              Decline
            </Button>
          </Box>
        );
      },
    },
  ];

  const rows = data?.map((message) => ({
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
  }));

  if (isLoading)
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

  if (error) {
    toast.error(`Failed to fetch states: ${error.message}`);
    return <></>;
  }

  return (
    <Box sx={{ height: 600, width: "100%" }}>
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
    </Box>
  );
};

export default AdminMessages;
