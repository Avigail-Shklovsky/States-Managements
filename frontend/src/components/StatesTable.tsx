import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IState } from "../types/state";
import ActionsCell from "./ActionsCell";

interface StatesTableProps {
  rows: Array<IState>;
  onDelete: (id: string) => void;
}

const StatesTable: React.FC<StatesTableProps> = ({ rows, onDelete }) => {
  const columns: GridColDef[] = [
    {
      field: "flag",
      headerName: "Flag",
      width: 150,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="flag"
          style={{ width: "50px", height: "30px", objectFit: "cover" }}
        />
      ),
    },
    { field: "name", headerName: "Name", width: 150 },
    {
      field: "population",
      headerName: "Population",
      type: "number",
      width: 110,
    },
    {
      field: "region",
      headerName: "Region",
      description: "This column is not sortable.",
      width: 160,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <ActionsCell
          id={params.row.id}
          name={params.row.name}
          onDelete={onDelete}
        />
      ),
    },
  ];

  return (
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
  );
};

export default StatesTable;
