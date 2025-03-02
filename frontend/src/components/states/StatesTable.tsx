import { GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import ActionsCell from "./ActionsCell";
import "./StatesTable.scss";
import { IState } from "../../types/state";
import { Typography } from "@mui/material";
import { Link } from "react-router";
import useHasPermission from "../../hooks/auth/useHasPermission";
import CitiesCell from "./CitiesCell";

interface StatesTableProps {
  rows: Array<IState>;
  onDelete: (id: string) => void;
}

const StatesTable: React.FC<StatesTableProps> = ({ rows, onDelete }) => {
  const hasCreatePermission = useHasPermission("create");
  const hasUpdatePermission = useHasPermission("update");
  const hasDeletePermission = useHasPermission("delete");

  const columns: GridColDef[] = [
    {
      field: "flag",
      headerName: "Flag",
      flex: 1,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="flag"
          style={{ width: "50px", height: "30px", objectFit: "cover" }}
        />
      ),
    },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "population", headerName: "Population", type: "number", flex: 1 },
    { field: "region", headerName: "Region", flex: 1 },
    {
      field: "cities",
      headerName: "Cities",
      flex: 3,
      renderCell: (params) => (
        <CitiesCell stateId={params.row._id} cities={params.value} />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <ActionsCell
          id={params.row.id}
          name={params.row.name}
          onDelete={onDelete}
          editPath="state-form"
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
          You don't have permission to perform certain actions.
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
            Request Permission
          </Link>
        </Typography>
      )}
    </div>
  );
};

export default StatesTable;
