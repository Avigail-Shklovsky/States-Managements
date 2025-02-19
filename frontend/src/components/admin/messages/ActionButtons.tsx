// ActionButtons.tsx
import { Box, Button } from "@mui/material";
import { IMessage } from "../../../types/message";


interface ActionButtonsProps {
  message: IMessage;
  actions: {
    label: string;
    color: "success" | "error" | "primary";
    onClick: (message: IMessage) => void;
  }[];
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ message, actions }) => (
  <Box display="flex" gap={1}>
    {actions.map((action, idx) => (
      <Button
        key={idx}
        variant="contained"
        color={action.color}
        onClick={() => action.onClick(message)}
      >
        {action.label}
      </Button>
    ))}
  </Box>
);

export default ActionButtons;
