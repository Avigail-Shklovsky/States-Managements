import { useMessages } from "./useMessages"; // Fetch messages from cache
import { useRecoilValue } from "recoil";
import { currentUserState } from "../../context/atom";

export const usePendingPermissionRequest = (permission: string) => {
  const currentUser = useRecoilValue(currentUserState);
  const { data: messages } = useMessages(); // React Query cached messages

  if (!currentUser || !messages || !permission) return false;

  return messages.some((msg) => {
    return (
      msg.userId === currentUser._id.toString() &&
      msg.actionType === permission &&
      !msg.approved && // Request is still pending
      (!msg.dateClose || new Date(msg.dateClose) > new Date()) // Not closed
    );
  });
};
