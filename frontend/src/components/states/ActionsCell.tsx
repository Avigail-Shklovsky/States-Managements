import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";

interface ActionsCellProps {
  id: string;
  name: string;
  onDelete: (id: string) => void;
  editPath: string;
  canEdit: boolean;
  canDelete: boolean;
  onEdit?: (id: string, name: string) => void;
}

const ActionsCell: React.FC<ActionsCellProps> = ({
  id,
  name,
  onDelete,
  editPath,
  canEdit,
  canDelete,
  onEdit,
}) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    if (editPath.includes("state-form")) {
      onEdit ? onEdit(id, name) : navigate(`/${editPath}/${id}`);
    } else {
      navigate(`/${editPath}/${id}`, { state: { mode: "edit", userid: id.toString() } });
    }
  };

  return (
    <div>
      <IconButton onClick={() => onDelete(id)} color="error" aria-label="delete" disabled={!canDelete}>
        <DeleteIcon />
      </IconButton>
      <IconButton onClick={handleEdit} color="primary" aria-label="edit" disabled={!canEdit}>
        <EditIcon />
      </IconButton>
    </div>
  );
};

export default ActionsCell;
