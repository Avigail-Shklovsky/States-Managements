import React, { useState } from "react";
import { Box, CircularProgress, Typography, useTheme, useMediaQuery } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import toast from "react-hot-toast";
import { useUsers } from "../../../hooks/users/useUsers";
import useDeleteUser from "../../../hooks/users/useDeleteUser";
import { useModal } from "../../../hooks/useModal";
import ConfirmModal from "../../states/ConfirmModal";
import { formatDate } from "../../../utils/formatDate";
import { AdminUserColumns } from "./AdminUserColumns";
import AdminUserCard, { UserRow } from "./AdminUserCard";

const AdminUsersGrid: React.FC = () => {
  const { data, error, isLoading } = useUsers();
  const { handleDelete } = useDeleteUser();
  const { isModalOpen, openModal, closeModal } = useModal();
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDeleteUser = (id: string) => {
    setSelectedRow(id);
    openModal();
  };

  const rows: UserRow[] =
    data?.map((user) => ({
      id: user._id.toString(),
      profilePicture: user.profileImage,
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      email: user.email,
      phone: user.phone,
      lastUpdated: formatDate(user.changedDate),
      permissions: user.auth.join(", "),
    })) || [];

  if (isLoading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height={400}>
        <CircularProgress />
      </Box>
    );

  if (error) {
    toast.error(`Failed to fetch users: ${error.message}`);
    return null;
  }

  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Admin User Management
      </Typography>
      {isSmallScreen ? (
        <>
          {rows.length > 0 ? (
            rows.map((row) => (
              <AdminUserCard key={row.id} row={row} onDelete={handleDeleteUser} />
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              No users available.
            </Typography>
          )}
        </>
      ) : (
        <Box sx={{ height: 400, minWidth: 1200 }}>
          <DataGrid
            rows={rows}
            columns={AdminUserColumns(handleDeleteUser)}
            initialState={{
              pagination: { paginationModel: { pageSize: 5 } },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
          />
        </Box>
      )}

      <ConfirmModal
        type="delete"
        open={isModalOpen}
        onClose={closeModal}
        onConfirm={() => {
          if (selectedRow) {
            handleDelete(selectedRow);
            closeModal();
          }
        }}
      />
    </Box>
  );
};

export default AdminUsersGrid;
