import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signUp } from "../services/authApi";

export const useSignUpApi = () => {

  const mutation = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      if (data?._id) {
        toast.success("Signed up successfully!");
      }
    },
    onError: () => {
      toast.error("Failed to sign up.");
    },
  });

  return mutation;
};
