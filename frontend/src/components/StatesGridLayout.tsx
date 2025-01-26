import {  useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchStates, deleteState } from "../services/statesApi";
import { IState } from "../types/state";
import toast from "react-hot-toast";
import StatesTable from "./StatesTable";
import { Box, Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "./ConfirmModal";

const StatesGridLayout = () => {
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data, error, isLoading } = useQuery<IState[], Error>({
    queryKey: ["states"],
    queryFn: fetchStates,
  });
  // useEffect(() => {
  //   if (data) {
  //     toast.success("State successfully updated");
  //   }
  // }, [data]);
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
    data?.map((state: IState) => ({
      id: state._id,
      ...state,
    })) || [];

  if (isLoading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height={400}
      >
        <CircularProgress />
      </Box>
    );

  if (error) {
    toast.error(`Failed to fetch states: ${error.message}`);
    return <></>;
  }

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <StatesTable
        rows={rows}
        onDelete={(id) => {
          setSelectedRow(id);
          setIsModalOpen(true);
        }}
      />
      <Button
        variant="outlined"
        onClick={() => {
          navigate("/form");
        }}
      >
        Add New State
      </Button>

      <ConfirmModal
        type="delete"
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
      />
    </Box>
  );
};

export default StatesGridLayout;
