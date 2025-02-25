import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addMessage } from "../../services/api/messageApi";
import { useNavigate } from "react-router";

export const usePermissionRequest = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: addMessage,
    onSuccess: (data) => {
      if (data?._id) {
        toast.success("your permission request successfully sent.");
        navigate(`/`);
      }
    },
    onError: () => {
      toast.error("Failed to send permission request.");
    },
  });

  return mutation;
};
