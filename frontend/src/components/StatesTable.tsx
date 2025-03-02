import { GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid"; // Using the free version
import { IState } from "../types/state";
import ActionsCell from "./ActionsCell";
import "./StatesTable.scss";

interface StatesTableProps {
  rows: Array<IState>;
  onDelete: (id: string) => void;
}

const StatesTable: React.FC<StatesTableProps> = ({ rows, onDelete }) => {
  const columns: GridColDef[] = [
    {
      field: "flag",
      headerName: "Flag",
      flex: 1, // Dynamically allocate space
      renderCell: (params) => (
        <img
          src={params.value}
          alt="flag"
          style={{ width: "50px", height: "30px", objectFit: "cover" }}
        />
      ),
    },
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "population",
      headerName: "Population",
      type: "number",
      flex: 1,
    },
    {
      field: "region",
      headerName: "Region",
      description: "This column is not sortable.",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1, // Allocate more space for actions
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
    <div className="responsive-table-container">
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
    </div>
  );
};

export default StatesTable;
