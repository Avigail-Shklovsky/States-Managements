import { Typography } from "@mui/material";

export const StatusIndicator: React.FC<{ approved?: boolean; dateClose: string }> = ({ approved, dateClose }) => {
    if (dateClose === "Open") return <Typography color="warning.main">Pending</Typography>;
    return approved ? (
      <Typography color="success.main">Approved</Typography>
    ) : (
      <Typography color="error.main">Declined</Typography>
    );
  };
  