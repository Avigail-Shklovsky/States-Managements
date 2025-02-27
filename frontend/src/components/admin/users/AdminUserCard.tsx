import React from "react";
import { Box, Typography, Divider, Paper } from "@mui/material";
import ActionsCell from "../../states/ActionsCell";
import { formatDate } from "../../../utils/formatDate";

export interface UserRow {
  id: string;
  profilePicture: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phone: string;
  lastUpdated: string;
  permissions: string;
}

interface AdminUserCardProps {
  row: UserRow;
  onDelete?: (id: string) => void;
  ActionsComponent?: React.FC<{
    id: string;
    name: string;
    onDelete: (id: string) => void;
    editPath: string;
  }>;
}



const AdminUserCard: React.FC<AdminUserCardProps> = ({
  row,
  onDelete,
  ActionsComponent = ActionsCell,
}) => (
  <Paper
    key={row.id}
    sx={{
      width: "100%",
      p: 2,
      mb: 2,
      boxShadow: 3,
      borderRadius: 2,
    }}
  >
    <Box display="flex" alignItems="center">
      <img
        src={`http://localhost:5000/${row.profilePicture}`}
        alt="Profile"
        style={{
          width: "45px",
          height: "45px",
          borderRadius: "50%",
        }}
      />
      <Box ml={2}>
        <Typography variant="subtitle1" fontWeight="bold">
          {row.firstName} {row.lastName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {row.userName}
        </Typography>
      </Box>
    </Box>
    <Divider sx={{ my: 1 }} />
    <Typography variant="body2">
      <strong>Email:</strong> {row.email}
    </Typography>
    <Typography variant="body2">
      <strong>Phone:</strong> {row.phone}
    </Typography>
    <Typography variant="body2">
      <strong>Last Updated:</strong> {formatDate(row.lastUpdated)}
    </Typography>
    <Typography variant="body2">
      <strong>Permissions:</strong> {row.permissions}
    </Typography>
    {onDelete && (
      <Box mt={2}>
        <ActionsComponent
          id={row.id}
          name={`${row.firstName} ${row.lastName}`}
          onDelete={onDelete}
          editPath="edit-profile"
        />
      </Box>
    )}
  </Paper>
);

export default AdminUserCard;
