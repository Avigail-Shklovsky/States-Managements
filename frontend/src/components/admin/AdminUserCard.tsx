import React from "react";
import { Box, Typography, Divider, Paper } from "@mui/material";
import ActionsCell from "../states/ActionsCell";

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
  onDelete: (id: string) => void;
}

const AdminUserCard: React.FC<AdminUserCardProps> = ({ row, onDelete }) => (
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
      <strong>Last Updated:</strong> {row.lastUpdated}
    </Typography>
    <Typography variant="body2">
      <strong>Permissions:</strong> {row.permissions}
    </Typography>
    <Box mt={2}>
      <ActionsCell
        id={row.id}
        name={""}
        onDelete={onDelete}
        editPath="edit-profile"
      />
    </Box>
  </Paper>
);

export default AdminUserCard;
