import { IMessage } from "../../types/message";
import { formatDate } from "../../utils/formatDate";
import { useQueryMessagesByUserId } from "./useMessagesByUserId";

export const useFormattedMessages = (userId: string) => {
    const { data: messages } = useQueryMessagesByUserId(userId);
  
    return messages?.map((message: IMessage) => ({
      id: message._id.toString(),
      userId: message.userId,
      actionType: message.actionType,
      approved: message.approved,
      dateOpen: formatDate(message.dateOpen),
      dateClose: formatDate(message.dateClose),
    })) || [];
  };
  