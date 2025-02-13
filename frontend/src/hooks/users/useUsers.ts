import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { fetchUsers } from "../../services/userApi";
import { IUser } from "../../types/user";

export const useUsers = () => {
  const queryClient = useQueryClient();

  const { data, error, isLoading, isFetching } = useQuery<IUser[], Error>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  useEffect(() => {
    if (data && !isFetching) {
      localStorage.setItem("statesFetched", "true");
    }
  }, [data, isFetching]);

  return { data, error, isLoading, queryClient };
};
