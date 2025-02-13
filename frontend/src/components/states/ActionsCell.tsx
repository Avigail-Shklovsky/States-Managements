import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { currentNameStateState } from "../../context/atom";
import useHasPermission from "../../hooks/auth/useHasPermission";

interface ActionsCellProps {
  id: string;
  name: string;
  onDelete: (id: string) => void;
  editPath: string;

}

const ActionsCell: React.FC<ActionsCellProps> = ({
  id,
  name,
  onDelete,
  editPath, 
}) => {
  const navigate = useNavigate();
  const [, setName] = useRecoilState(currentNameStateState);
  const hasDeletePermission = useHasPermission("delete");
  const hasUpdatePermission = useHasPermission("update");


  return (
    <div className="action-buttons">
      <IconButton
        onClick={() => onDelete(id)}
        color="error" // Red color for delete action
        aria-label="delete"
        disabled={!hasDeletePermission}
      >
        <DeleteIcon />
      </IconButton>
      <IconButton
        color="primary"
        aria-label="edit"
        disabled={!hasUpdatePermission}
        onClick={() => {
          if (editPath.includes("state-form")) {
            navigate(`/${editPath}/${id}`);
            setName(name);
          }
          else{
            navigate(`/${editPath}/${id}`, { state: { mode: "edit", userid:id.toString() } });
          }
        }}
      >
        <EditIcon />
      </IconButton>
    </div>
  );
};

export default ActionsCell;
