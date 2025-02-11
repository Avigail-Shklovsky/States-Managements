import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateUserWithoutImage } from "../../services/userApi";
import { IUser } from "../../types/user";
import { useQueryUserById } from "./useQueryUserbyId";

export const useUpdateUserAuth = (id: string, permissionType: string) => {
  const user = useQueryUserById(id); // Ensure user data is available

  const updatedUser = user
    ? {
        ...user,
        auth: [...(user.auth || []), permissionType], // Ensure auth is an array
      }
    : null;

  const mutation = useMutation({
    mutationFn: (updatedUser: IUser) => updateUserWithoutImage(updatedUser),
    onSuccess: (data) => {
      if (data?._id) {
        toast.success("Profile updated successfully!");
      }
    },
    onError: () => {
      toast.error("Failed to update profile.");
    },
  });

  return { mutation, updatedUser};
};
