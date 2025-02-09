import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { deleteState } from "../../services/statesApi";

export const useDeleteState = () => {
  const queryClient = useQueryClient();

  const handleDelete = async (id: string) => {
    toast
      .promise(deleteState(id), {
        loading: "Deleting...",
        success: "State deleted successfully!",
        error: "Failed to delete state.",
      })
      .then(() => queryClient.invalidateQueries({ queryKey: ["states"] }));
  };

  return { handleDelete };
};
export default useDeleteState;
