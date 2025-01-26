import { useQueryClient } from "@tanstack/react-query";
import { IState } from "../types/state";

export const useFetchState = (id: string | undefined) => {
  const queryClient = useQueryClient();
  const cachedStates = queryClient.getQueryData<IState[]>(["states"]);
  
  const stateData = cachedStates?.find((state) => String(state._id) === id);
  
  return stateData;
};
