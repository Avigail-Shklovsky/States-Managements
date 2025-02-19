import React, { useState } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useUsers } from "../../hooks/users/useUsers";
import useDeleteUser from "../../hooks/users/useDeleteUser";
import { useModal } from "../../hooks/useModal";
import ConfirmModal from "../states/ConfirmModal";
import AdminUserCard, { UserRow } from "./AdminUserCard";
import ActionsCell from "../states/ActionsCell";

dayjs.extend(utc);
dayjs.extend(timezone);


const formatDate = (date: Date | string | null | undefined): string =>
  date
    ? dayjs(date).tz("Asia/Jerusalem").format("MMM D, YYYY, hh:mm A")
    : "N/A";

const AdminGrid: React.FC = () => {
  const { data, error, isLoading } = useUsers();
  const { handleDelete } = useDeleteUser();
  const { isModalOpen, openModal, closeModal } = useModal();
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const columns: GridColDef[] = [
    {
      field: "profilePicture",
      headerName: "Profile Picture",
      width: 130,
      renderCell: (params) => (
        <img
          src={`http://localhost:5000/${params.value}`}
          alt="Profile"
          style={{ width: "45px", height: "45px", borderRadius: "50%" }}
        />
      ),
    },
    { field: "firstName", headerName: "First Name", width: 130 },
    { field: "lastName", headerName: "Last Name", width: 130 },
    { field: "userName", headerName: "User Name", width: 130 },
    { field: "email", headerName: "Email", width: 180 },
    { field: "phone", headerName: "Phone", width: 130 },
    { field: "lastUpdated", headerName: "Last Updated", width: 180 },
    { field: "permissions", headerName: "Permissions", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      width: 50,
      renderCell: (params) => (
        <Box>
          <Box>
            <ActionsCell
              id={params.row.id}
              name={""}
              onDelete={(id) => {
                setSelectedRow(id);
                openModal();
              }}
              editPath="edit-profile"
            />
          </Box>
        </Box>
      ),
    },
  ];

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
    return <></>;
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
              <AdminUserCard
                key={row.id}
                row={row}
                onDelete={(id) => {
                  setSelectedRow(id);
                  openModal();
                }}
              />
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
            columns={columns}
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

export default AdminGrid;
