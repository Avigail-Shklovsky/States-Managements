import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateProfile } from "../services/userApi";

export const useUpdateProfileApi = () => {
  // Use mutateAsync to directly call the mutation in async functions
  const mutation = useMutation({
    mutationFn: ({ userId, formData }: { userId: string; formData: FormData }) =>
      updateProfile(userId, formData),
    onSuccess: (data) => {
      if (data?._id) {
        toast.success("Profile updated successfully!");
      }
    },
    onError: () => {
      toast.error("Failed to update profile.");
    },
  });

  return mutation;
};
