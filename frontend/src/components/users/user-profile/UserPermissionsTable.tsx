import { DataGrid, GridColDef } from "@mui/x-data-grid";

export const UserPermissionsTable: React.FC<{ rows: any[]; columns: GridColDef[] }> = ({ rows, columns }) => (
    <DataGrid
      rows={rows}
      columns={columns}
      initialState={{
        pagination: { paginationModel: { pageSize: 10 } },
      }}
      pageSizeOptions={[5, 10]}
      disableRowSelectionOnClick
      getRowClassName={(params) => (params.row.dateClose !== "Open" ? "closed-row" : "")}
      sx={{
        height: 400,
        "& .closed-row": { backgroundColor: "#e0e0e0", opacity: 0.8 },
      }}
    />
  );
  