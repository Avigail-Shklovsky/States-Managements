import { useState } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import StatesTable from "./StatesTable";
import { useModal } from "../../hooks/useModal";
import ConfirmModal from "./ConfirmModal";
import toast from "react-hot-toast";
import { IState } from "../../types/state";
import { useStates } from "../../hooks/states/useStates";
import useDeleteState from "../../hooks/states/useDeleteState";
import useHasPermission from "../../hooks/auth/useHasPermission";
import { ACTION_TYPES, PATHS, STATE_EDIT_CREATE, TOAST_MESSGAES } from "../../constants";

interface StatesGridLayoutProps {
  fetchStates?: typeof useStates;
  deleteState?: typeof useDeleteState;
  checkPermission?: typeof useHasPermission;
}

const StatesGridLayout = ({
  fetchStates = useStates,
  deleteState = useDeleteState,
  checkPermission = useHasPermission,
}: StatesGridLayoutProps) => {
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const { isModalOpen, openModal, closeModal } = useModal();
  const navigate = useNavigate();
  const hasCreatePermission = checkPermission(ACTION_TYPES.CREATE);
  const { data, error, isLoading } = fetchStates();
  const { handleDelete } = deleteState();

  const handleDeleteState = () => {
    if (selectedRow) {
      handleDelete(selectedRow);
      closeModal();
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
    toast.error(TOAST_MESSGAES.ERROR);
    return null;
  }

  return (
    <div data-testid="states-grid-layout">
      <Box sx={{ width: "100%", mt: 10 }}>
        <StatesTable
          rows={rows}
          onDelete={(id) => {
            setSelectedRow(id);
            openModal();
          }}
        />
        <Button
          variant="outlined"
          disabled={!hasCreatePermission}
          onClick={() => navigate(PATHS.STATE_FORM)}
        >
         {STATE_EDIT_CREATE.ADD_NEW}
        </Button>
        <ConfirmModal type={ACTION_TYPES.DELETE} open={isModalOpen} onClose={closeModal} onConfirm={handleDeleteState} />
      </Box>
    </div>
  );
};

export default StatesGridLayout;
