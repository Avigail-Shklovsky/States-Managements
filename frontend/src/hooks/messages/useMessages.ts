import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { fetchMessages } from "../../services/messageApi";
import { IMessage } from "../../types/message";

export const useMessages = () => {
  const queryClient = useQueryClient();

  const { data, error, isLoading, isFetching } = useQuery<IMessage[], Error>({
    queryKey: ["messages"],
    queryFn: fetchMessages,
  });

  useEffect(() => {

    if ( data && !isFetching) {
      // toast.success("States fetched and cached successfully! ");
      localStorage.setItem("messagesFetched", "true"); // Mark as shown
    }
  }, [data, isFetching]);

  return { data, error, isLoading, queryClient };
};
