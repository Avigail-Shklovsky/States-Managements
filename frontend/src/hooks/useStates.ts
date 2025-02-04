import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchStates } from "../services/statesApi";
import { IState } from "../types/state";
import { useEffect } from "react";
import toast from "react-hot-toast";

export const useStates = () => {
  const queryClient = useQueryClient();

  const { data, error, isLoading, isFetching } = useQuery<IState[], Error>({
    queryKey: ["states"],
    queryFn: fetchStates,
  });

  useEffect(() => {
    // Check if toast was already shown during this app session
    // const hasAnnounced = localStorage.getItem("statesFetched");

    if ( data && !isFetching) {
      toast.success("States fetched and cached successfully! ");
      localStorage.setItem("statesFetched", "true"); // Mark as shown
    }
  }, [data, isFetching]);

  return { data, error, isLoading, queryClient };
};
