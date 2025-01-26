import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { currentNameStateState } from "../context/atom";

interface ActionsCellProps {
  id: string;
  name: string;
  onDelete: (id: string) => void;
}

const ActionsCell: React.FC<ActionsCellProps> = ({ id, name, onDelete }) => {
  const navigate = useNavigate();
  const [, setName] = useRecoilState(currentNameStateState);

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          navigate(`/form/${id}`);
          setName(name);
        }}
      >
        Edit
      </Button>
      <Button
        variant="contained"
        color="error"
        onClick={() => onDelete(id)}
      >
        Delete
      </Button>
    </div>
  );
};

export default ActionsCell;
