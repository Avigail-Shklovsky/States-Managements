import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { IState } from "../../types/state";
import { fetchStates } from "../../services/statesApi";

export const useStates = () => {
  const queryClient = useQueryClient();

  const { data, error, isLoading, isFetching } = useQuery<IState[], Error>({
    queryKey: ["states"],
    queryFn: fetchStates,
  });

  useEffect(() => {
    if (data && !isFetching) {
      toast.success("States fetched and cached successfully! ");
      localStorage.setItem("statesFetched", "true");
    }
  }, [data, isFetching]);

  return { data, error, isLoading, queryClient };
};
