import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateMessage } from "../../services/messageApi";
import { IMessage } from "../../types/message";

export const useUpdateMessageById = () => {
  const mutation = useMutation({
    mutationFn: ({ message }: { message: IMessage }) => updateMessage(message),
    onSuccess: (data) => {
      if (data?._id) {
        toast.success("Message updated successfully!");
      }
    },
    onError: () => {
      toast.error("Failed to update Message.");
    },
  });

  return mutation;
};
