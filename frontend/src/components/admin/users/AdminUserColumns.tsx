import { GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import ActionsCell from "../../states/ActionsCell";
import {
  PATHS,
  USER_PROPS,
  USER_PROPS_FORMAL,
} from "../../../constants";

export const AdminUserColumns = (
  onDelete: (id: string) => void
): GridColDef[] => [
  {
    field: USER_PROPS.IMAGE,
    headerName: USER_PROPS_FORMAL.IMAGE,
    width: 130,
    renderCell: (params) => (
      <img
        src={`${PATHS.LOCAL_HOST_5000}/${params.value}`}
        alt={USER_PROPS.IMAGE}
        style={{ width: "45px", height: "45px", borderRadius: "50%" }}
      />
    ),
  },
  {
    field: USER_PROPS.FIRST_NAME,
    headerName: USER_PROPS_FORMAL.FIRST_NAME,
    width: 130,
  },
  {
    field: USER_PROPS.LAST_NAME,
    headerName: USER_PROPS_FORMAL.LAST_NAME,
    width: 130,
  },
  {
    field: USER_PROPS.USER_NAME,
    headerName: USER_PROPS_FORMAL.USER_NAME,
    width: 130,
  },
  {
    field: USER_PROPS.EMAIL,
    headerName: USER_PROPS_FORMAL.EMAIL,
    width: 180,
  },
  {
    field: USER_PROPS.PHONE,
    headerName: USER_PROPS_FORMAL.PHONE,
    width: 130,
  },
  {
    field: USER_PROPS.LAST_UPDATED,
    headerName: USER_PROPS_FORMAL.LAST_UPDATED,
    width: 180,
  },
  {
    field: USER_PROPS.PERMISSIONS,
    headerName: USER_PROPS_FORMAL.PERMISSIONS,
    width: 200,
  },
  {
    field: USER_PROPS.ACTIONS,
    headerName: USER_PROPS_FORMAL.ACTIONS,
    flex: 1,
    width: 50,
    renderCell: (params) => (
      <Box>
        <ActionsCell
          id={params.row.id}
          name={""}
          onDelete={() => onDelete(params.row.id)}
          editPath={PATHS.EDIT_PROFILE}
          canDelete={true}
          canEdit={true}
        />
      </Box>
    ),
  },
];
