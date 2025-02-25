import { useMessages } from "../hooks/messages/useMessages";
import { useUpdateMessageById } from "../hooks/messages/useUpdateMessageById";
import { IMessage } from "../types/message";

export const useMessagesService = () => {
  const { data, error, isLoading } = useMessages();
  const { mutate: updateMessageById } = useUpdateMessageById();

  return { data, error, isLoading, updateMessageById };
};

export const approveMessage = (message: IMessage, status: boolean): IMessage => {
    return {
      ...message,
      approved: status,
      read: true,
      dateClose: new Date(),
    };
  };