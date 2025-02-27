import React from "react";
import { useQueryUserById } from "../hooks/users/useQueryUserbyId";

interface UsernameCellProps {
  userId: string;
}

const UsernameCell: React.FC<UsernameCellProps> = ({ userId }) => {
  const user = useQueryUserById(userId);
  return user ? user.userName : "Loading..." 
};

export default UsernameCell;
