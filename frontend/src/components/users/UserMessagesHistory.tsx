import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Typography, Paper, Divider } from "@mui/material";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { IMessage } from "../../types/message";
import { useQueryMessagesByUserId } from "../../hooks/messages/useMessagesByUserId";
dayjs.extend(utc);
dayjs.extend(timezone);

interface UserPermissionsProps {
  userId: string;
}

const UserPermissions: React.FC<UserPermissionsProps> = ({ userId }) => {
  const { data: messages } = useQueryMessagesByUserId(userId);

  const columns: GridColDef[] = [
    { field: "actionType", headerName: "Action Type", width: 180 },
    { field: "dateOpen", headerName: "Request Date", width: 200 },
    { field: "dateClose", headerName: "Response Date", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 160,
      align: "center",
      renderCell: (params) => {
        if (params.row.dateClose === "Open") {
          return <Typography color="warning.main">Pending</Typography>;
        }
        return params.row.approved ? (
          <Typography color="success.main">Approved</Typography>
        ) : (
          <Typography color="error.main">Declined</Typography>
        );
      },
    },
  ];

  const rows = messages?.map((message: IMessage) => ({
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

  return (
    <Box
      sx={{ mt: 3, padding: 3, backgroundColor: "#f9f9f9", borderRadius: 2 }}
    >
      <Typography variant="h6" fontWeight="bold" color="text.primary" mb={2}>
        User Permissions History
      </Typography>

      <Paper sx={{ boxShadow: 3, borderRadius: 2, padding: 2 }}>
        <Divider sx={{ mb: 2 }} />
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
            height: 400,
            "& .closed-row": {
              backgroundColor: "#e0e0e0",
              opacity: 0.8,
            },
          }}
        />
      </Paper>
    </Box>
  );
};

export default UserPermissions;
