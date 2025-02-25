import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../../services/api/userApi";

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  const handleDelete = async (id: string) => {
    toast
      .promise(deleteUser(id), {
        loading: "Deleting...",
        success: "User deleted successfully!",
        error: "Failed to delete user.",
      })
      .then(() => queryClient.invalidateQueries({ queryKey: ["users"] }));
  };

  return { handleDelete };
};
export default useDeleteUser;
