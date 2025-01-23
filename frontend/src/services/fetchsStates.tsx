import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import toast from "react-hot-toast";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IState } from "../types/state";

const fetchStates = async () => {
  const response = await axios.get("http://localhost:5000/states");
  return response.data;
};

const deleteState = async (id: string) => {
  const response = await axios.delete(`http://localhost:5000/states/${id}`);
  return response.data;
};

const States = () => {
  const queryClient = useQueryClient();
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // React Query: Fetch states
  const { data, error, isLoading } = useQuery({
    queryKey: ["states"],
    queryFn: fetchStates,
  });

  // Handle delete confirmation
  const handleDelete = async () => {
    if (selectedRow) {
      toast
        .promise(deleteState(selectedRow), {
          loading: "Deleting...",
          success: "State deleted successfully!",
          error: "Failed to delete state.",
        })
        .then(() => {
          queryClient.invalidateQueries({ queryKey: ["states"] });
        });
      setIsModalOpen(false);
    }
  };

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
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => alert(`Edit form for ${params.row.id}`)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              setSelectedRow(params.row.id);
              setIsModalOpen(true);
            }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const rows =
    data?.map((state: IState) => ({
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
      <Button variant="contained" size="large">
        Large
      </Button>
      {/* Modal for delete confirmation */}
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Are you sure you want to delete this state?
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              marginTop: 2,
            }}
          >
            <Button variant="contained" color="error" onClick={handleDelete}>
              Yes, Delete
            </Button>
            <Button variant="outlined" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default States;
