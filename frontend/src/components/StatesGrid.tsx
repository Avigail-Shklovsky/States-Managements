import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchStates, deleteState } from "../services/statesApi";
import { IState } from "../types/state";
import toast from "react-hot-toast";
import StatesTable from "./StatesGridLayout";
import DeleteConfirmModal from "./DeleteConfirmModal";
import { Box, CircularProgress, Typography } from "@mui/material";

const StatesGridLayout = () => {
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery<IState[], Error>({
    queryKey: ["states"],
    queryFn: fetchStates,
  });

  const handleDelete = async () => {
    if (selectedRow) {
      toast
        .promise(deleteState(selectedRow), {
          loading: "Deleting...",
          success: "State deleted successfully!",
          error: "Failed to delete state.",
        })
        .then(() => queryClient.invalidateQueries({ queryKey: ["states"] }));
      setIsModalOpen(false);
    }
  };

  const rows =
    data?.map((state) => ({
      id: state._id,
      ...state,
    })) || [];

  if (isLoading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height={400}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height={400}>
        <Typography color="error" variant="h6">
          An error occurred: {error.message}
        </Typography>
      </Box>
    );

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <StatesTable rows={rows} onDelete={(id) => {
        setSelectedRow(id);
        setIsModalOpen(true);
      }} />
      <DeleteConfirmModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
      />
    </Box>
  );
};

export default StatesGridLayout;
