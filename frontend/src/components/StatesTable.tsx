import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { IState } from "../types/state";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { currentNameStateState } from "../context/atom";

interface StatesTableProps {
  rows: Array<IState>;
  onDelete: (id: string) => void;
}

const StatesTable: React.FC<StatesTableProps> = ({ rows, onDelete }) => {
  const navigate = useNavigate();
  const [, setName] = useRecoilState(currentNameStateState);

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
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              navigate(`/form/${params.row.id}`);
              setName(params.row.name);
            }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => onDelete(params.row.id)}
          >
            Delete
          </Button>
        </div>
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
