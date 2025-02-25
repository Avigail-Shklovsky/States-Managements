import React from "react";
import { useQueryUserById } from "../hooks/users/useQueryUserbyId";
import { Typography } from "@mui/material";

interface UsernameCellProps {
  userId: string;
}

const UsernameCell: React.FC<UsernameCellProps> = ({ userId }) => {
  const user = useQueryUserById(userId);
  return <Typography variant="body2">{user ? user.userName : "Loading..."}</Typography>;
};

export default UsernameCell;
