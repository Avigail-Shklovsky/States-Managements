import { useState } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import StatesTable from "./StatesTable";
import { useModal } from "../hooks/useModal";
import { useStates } from "../hooks/useStates";
import  useDeleteState  from "../hooks/useDeleteState"; 
import ConfirmModal from "./ConfirmModal";
import toast from "react-hot-toast";
import { IState } from "../types/state";

const StatesGridLayout = () => {
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const { isModalOpen, openModal, closeModal } = useModal();
  const navigate = useNavigate();

  // Using the custom hooks
  const { data, error, isLoading } = useStates();
  const { handleDelete } = useDeleteState(); 

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
    <div data-testid="states-grid-layout">
      <Box sx={{ width: "100%", mt: 10 }}>
        {" "}
        {/* Add mt and calc for full viewport height minus navbar */}
        <StatesTable
          rows={rows}
          onDelete={(id) => {
            setSelectedRow(id);
            openModal();
          }}
        />
        <Button variant="outlined" onClick={() => navigate("/form")}>
          Add New State
        </Button>
        <ConfirmModal
          type="delete"
          open={isModalOpen}
          onClose={closeModal}
          onConfirm={() => {
            if (selectedRow) {
              handleDelete(selectedRow);
              closeModal();
            }
          }}
        />
      </Box>
    </div>
  );
};

export default StatesGridLayout;
