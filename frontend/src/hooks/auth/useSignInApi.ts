import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signIn } from "../../services/authApi";

export const useSignInApi = () => {
  const mutation = useMutation({
    mutationFn: async ({
      userName,
      password,
    }: {
      userName: string;
      password: string;
    }) => {
      const result = await signIn(userName, password);
      return result;
    },
    onSuccess: (data) => {
      if (data.token) {
        toast.success("Signed in successfully!");
      }
    },
    onError: (error: any) => {
      if (error.response?.status === 429) {
        toast.error("Too many login attempts. Please try again later.");
      } else {
        toast.error("Failed to sign in.");
      }
    },
  });

  return mutation;
};
