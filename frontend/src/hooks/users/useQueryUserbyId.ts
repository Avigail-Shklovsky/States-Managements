import { useQueryClient } from "@tanstack/react-query";
import { IUser } from "../../types/user";

export const useQueryUserById = (id: string | undefined) => {
  const queryClient = useQueryClient();
  const cachedUsers = queryClient.getQueryData<IUser[]>(["users"]);

  const userData = cachedUsers?.find((user) => String(user._id) === id);
  return userData;
};
