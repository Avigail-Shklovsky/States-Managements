import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchStates } from "../services/statesApi";
import { IState } from "../types/state";

export const useStates = () => {
  const queryClient = useQueryClient();
  
  const { data, error, isLoading } = useQuery<IState[], Error>({
    queryKey: ["states"],
    queryFn: fetchStates,
   
  });

  return { data, error, isLoading, queryClient };
};
