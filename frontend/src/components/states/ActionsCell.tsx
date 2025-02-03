import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { currentNameStateState } from "../../context/atom";

interface ActionsCellProps {
  id: string;
  name: string;
  onDelete: (id: string) => void;
}

const ActionsCell: React.FC<ActionsCellProps> = ({ id, name, onDelete }) => {
  const navigate = useNavigate();
  const [, setName] = useRecoilState(currentNameStateState);
  return (
    <div className="action-buttons">
      <IconButton
        onClick={() => onDelete(id)}
        color="error" // Red color for delete action
        aria-label="delete"
      >
        <DeleteIcon />
      </IconButton>
      {/* If you want to add an Edit button, you can use the following: */}
      <IconButton
        color="primary"
        aria-label="edit"
        onClick={() => {
          navigate(`/form/${id}`);
          setName(name);
        }}
      >
        <EditIcon />
      </IconButton>
    </div>
  );
};

export default ActionsCell;
