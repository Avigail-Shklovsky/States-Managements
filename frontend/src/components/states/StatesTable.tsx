import { GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import ActionsCell from "./ActionsCell";
import "./StatesTable.scss";
import { IState } from "../../types/state";
import { Typography } from "@mui/material";
import { Link } from "react-router";
import useHasPermission from "../../hooks/auth/useHasPermission";
import CitiesCell from "./CitiesCell";
import { ACTION_TYPES, PATHS, REQUEST_PERMISSION, STATE_PROPS, STATE_PROPS_FORMAL } from "../../constants";

interface StatesTableProps {
  rows: Array<IState>;
  onDelete: (id: string) => void;
}

const StatesTable: React.FC<StatesTableProps> = ({ rows, onDelete }) => {
  const hasCreatePermission = useHasPermission(ACTION_TYPES.CREATE);
  const hasUpdatePermission = useHasPermission(ACTION_TYPES.UPDATE);
  const hasDeletePermission = useHasPermission(ACTION_TYPES.DELETE);

  const columns: GridColDef[] = [
    {
      field: STATE_PROPS.FLAG,
      headerName: STATE_PROPS_FORMAL.FLAG,
      flex: 1,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="flag"
          style={{ width: "50px", height: "30px", objectFit: "cover" }}
        />
      ),
    },
    { field: STATE_PROPS.NAME, headerName: STATE_PROPS_FORMAL.NAME, flex: 1 },
    { field: STATE_PROPS.POPULATION, headerName: STATE_PROPS_FORMAL.POPULATION, type: "number", flex: 1 },
    { field: STATE_PROPS.REGION, headerName:STATE_PROPS_FORMAL.REGION, flex: 1 },
    {
      field: STATE_PROPS.CITIES,
      headerName: STATE_PROPS_FORMAL.CITIES,
      flex: 3,
      renderCell: (params) => (
        <CitiesCell stateId={params.row._id} cities={params.value} />
      ),
    },
    {
      field: STATE_PROPS.ACTIONS,
      headerName: STATE_PROPS_FORMAL.ACTIONS,
      flex: 1,
      renderCell: (params) => (
        <ActionsCell
          id={params.row.id}
          name={params.row.name}
          onDelete={onDelete}
          editPath={PATHS.STATE_FORM}
          canDelete={hasDeletePermission}
          canEdit={hasUpdatePermission}
        />
      ),
    },
  ];

  return (
    <div className="responsive-table-container">
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
        sx={{ width: "100vw" }}
      />
      {(!hasCreatePermission ||
        !hasUpdatePermission ||
        !hasDeletePermission) && (
        <Typography
          variant="body2"
          color="error"
          sx={{ textAlign: "center", marginTop: 2 }}
        >
          {REQUEST_PERMISSION.NO_PERMISSION_ERROR}
          <br />
          <Link
            to="/profile?tab=permission-form"
            style={{
              marginLeft: "8px",
              textDecoration: "underline",
              color: "#1976d2",
              cursor: "pointer",
            }}
          >
            {REQUEST_PERMISSION.REQUEST_LINK}
          </Link>
        </Typography>
      )}
    </div>
  );
};

export default StatesTable;
