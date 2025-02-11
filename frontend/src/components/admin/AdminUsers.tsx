import { Box, CircularProgress, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import ActionsCell from "../states/ActionsCell";
import { useModal } from "../../hooks/useModal";
import { useState } from "react";
import ConfirmModal from "../states/ConfirmModal";
import useDeleteUser from "../../hooks/users/useDeleteUser";
import { useUsers } from "../../hooks/users/useUsers";
dayjs.extend(utc);
dayjs.extend(timezone);

const AdminGrid = () => {
  const { data, error, isLoading } = useUsers();
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const { isModalOpen, openModal, closeModal } = useModal();
    const { handleDelete } = useDeleteUser(); 
  
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
      renderCell: (params) => (
        <ActionsCell
          id={params.row.id}
          name={""}
          onDelete={(id) => {
            setSelectedRow(id);
            openModal();
          }}
          editPath="edit-profile"
        />
      ),
    },
  ];

  const rows = data?.map((user) => ({
    id: user._id.toString(),
    profilePicture: user.profileImage,
    firstName: user.firstName,
    lastName: user.lastName,
    userName: user.userName,
    email: user.email,
    phone: user.phone,
    lastUpdated: dayjs(user.changedDate)
      .tz("Asia/Jerusalem")
      .format("MMM D, YYYY, hh:mm A"),
    permissions: user.auth.join(", "),
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
    <Box sx={{ height: 400, width: "100%" }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Admin User Management
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5 },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />

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
