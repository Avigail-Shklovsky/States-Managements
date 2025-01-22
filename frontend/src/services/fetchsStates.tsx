import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import toast from "react-hot-toast";
import { State } from "../types/state";

const fetchStates = async () => {
  try {
    const response = await axios.get("http://localhost:5000/states");
    return response.data;
  } catch (error) {
    toast.error("Error fetching states");
    throw new Error(`Network response was not ok ${error}`);
  }
};

const States = () => {
  // Fetching states with React Query
  const { data, error, isLoading } = useQuery({
    queryKey: ["states"],
    queryFn: async () => {
      return toast.promise(fetchStates(), {
        loading: "Fetching states...",
        success: "States fetched successfully!",
        error: "Failed to fetch states.",
      });
    },
  });

  const columns: GridColDef<(typeof rows)[number]>[] = [
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
    {
      field: "name",
      headerName: "Name",
      width: 150,
    },
    {
      field: "population",
      headerName: "Population",
      type: "number",
      width: 110,
    },
    {
      field: "region",
      headerName: "Region",
      width: 160,
    },
  ];

  const rows =
    data?.map((state:State) => ({
      id: state._id, // Map `_id` to `id`
      flag: state.flag,
      name: state.name,
      population: state.population,
      region: state.region,
    })) || [];

  if (isLoading) return <div>Loading...</div>;

  if (error) {
    return (
      <div>
        <p>An error occurred: {error.message}</p>
      </div>
    );
  }

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default States;
