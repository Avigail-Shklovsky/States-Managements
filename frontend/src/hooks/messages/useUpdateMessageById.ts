import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateMessage } from "../../services/api/messageApi";
import { IMessage } from "../../types/message";

export const useUpdateMessageById = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ message }: { message: IMessage }) => updateMessage(message),
    onSuccess: (data) => {
      if (data?._id) {
        toast.success("Message updated successfully!");
        queryClient.setQueryData(["message", data._id], data);
        queryClient.setQueryData(
          ["messages"],
          (oldData: IMessage[] | undefined) => {
            if (!oldData) return [data];
            return oldData.map((msg) => (msg._id === data._id ? data : msg));
          }
        );
        queryClient.invalidateQueries({ queryKey: ["messages"] });
      }
    },
    onError: () => {
      toast.error("Failed to update Message.");
    },
  });

  return mutation;
};
