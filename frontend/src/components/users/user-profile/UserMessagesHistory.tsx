import { GridColDef } from "@mui/x-data-grid";
import {
  Box,
  Typography,
  Paper,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useFormattedMessages } from "../../../hooks/messages/useFormattedMessages";
import { StatusIndicator } from "./StatusIndicator";
import { UserPermissionsTable } from "./UserPermissionsTable";


interface UserPermissionsProps {
  userId: string;
}

const UserPermissions: React.FC<UserPermissionsProps> = ({ userId }) => {
  const rows = useFormattedMessages(userId);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const columns: GridColDef[] = [
    { field: "actionType", headerName: "Action Type", width: 180 },
    { field: "dateOpen", headerName: "Request Date", width: 200 },
    { field: "dateClose", headerName: "Response Date", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 160,
      align: "center",
      renderCell: (params) => <StatusIndicator approved={params.row.approved} dateClose={params.row.dateClose} />,
    },
  ];

  return (
    <Box sx={{ mt: 3, padding: 3, backgroundColor: "#f9f9f9", borderRadius: 2 }}>
      <Typography variant="h6" fontWeight="bold" color="text.primary" mb={2}>
        User Permissions History
      </Typography>
      <Paper sx={{ boxShadow: 3, borderRadius: 2, padding: 2 }}>
        <Divider sx={{ mb: 2 }} />
        {isSmallScreen ? (
          rows.length > 0 ? (
            rows.map((row) => (
              <Paper key={row.id} sx={{ p: 2, mb: 2, width: "100%", boxShadow: 3, borderRadius: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold">{row.actionType}</Typography>
                <Divider sx={{ my: 1 }} />
                <Typography variant="body2"><strong>Request Date:</strong> {row.dateOpen}</Typography>
                <Typography variant="body2"><strong>Response Date:</strong> {row.dateClose}</Typography>
                <Typography variant="body2"><strong>Status:</strong> <StatusIndicator approved={row.approved} dateClose={row.dateClose} /></Typography>
              </Paper>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">No messages available.</Typography>
          )
        ) : (
          <UserPermissionsTable rows={rows} columns={columns} />
        )}
      </Paper>
    </Box>
  );
};

export default UserPermissions;
