import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateUserWithoutImage } from "../../services/userApi";
import { IUser } from "../../types/user";
import { useQueryUserById } from "./useQueryUserbyId";

export const useUpdateUserAuth = (id: string, permissionType: string) => {
  const user = useQueryUserById(id);
  const queryClient = useQueryClient();

  const updatedUser = user
    ? {
        ...user,
        auth: [...(user.auth || []), permissionType],
      }
    : null;

  const mutation = useMutation({
    mutationFn: (updatedUser: IUser) => updateUserWithoutImage(updatedUser),
    onSuccess: (data) => {
      if (data?._id) {
        toast.success("Profile updated successfully!");
        queryClient.setQueryData(["user", id], data);

      }
    },
    onError: () => {
      toast.error("Failed to update profile.");
    },
  });

  return { mutation, updatedUser};
};
