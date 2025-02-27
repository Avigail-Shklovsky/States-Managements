import { GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import ActionsCell from "../../states/ActionsCell";

export const AdminUserColumns = (onDelete: (id: string) => void): GridColDef[] => [
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
        <ActionsCell
          id={params.row.id}
          name={""}
          onDelete={() => onDelete(params.row.id)}
          editPath="edit-profile"
          canDelete={true}
          canEdit={true}
        />
      </Box>
    ),
  },
];
