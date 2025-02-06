import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addMessage } from "../services/messageApi";

export const usePermissionRequest = () => {

  const mutation = useMutation({
    mutationFn: addMessage,
    onSuccess: (data) => {
      if (data?._id) {
        toast.success("your permission request successfully sent.");
      }
    },
    onError: () => {
      toast.error("Failed to send permission request.");
    },
  });

  return mutation;
};
