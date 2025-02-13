import { useRecoilValue } from "recoil";
import { currentUserState } from "../../context/atom";
import { useQueryClient } from "@tanstack/react-query";
import { IMessage } from "../../types/message";

export const usePendingPermissionRequest = (permission: string) => {
  const currentUser = useRecoilValue(currentUserState);
  const queryClient = useQueryClient();
  const messages = queryClient.getQueryData<IMessage[]>(["messages"]);

  if (!currentUser || !messages || !permission) return false;

  return messages.some((msg) => {
    return (
      msg.userId === currentUser._id.toString() &&
      msg.actionType === permission &&
      !msg.approved &&
      (!msg.dateClose || new Date(msg.dateClose) > new Date())
    );
  });
};
