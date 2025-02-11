import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { IMessage } from "../../types/message";
import { useMessages } from "./useMessages";

export const useQueryMessagesByUserId = (userId: string) => {
  useMessages();
  const queryClient = useQueryClient();

  const cachedMessages = queryClient.getQueryData<IMessage[]>(["messages"]);

  const filteredMessages = useMemo(() => {
    if (!cachedMessages) return [];
    return cachedMessages.filter((message) => message.userId === userId);
  }, [cachedMessages, userId]);

  return { data: filteredMessages };
};
