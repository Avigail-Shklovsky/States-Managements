import { addState, updateState } from "../services/statesApi";
import { IState } from "../types/state";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useStateAPI = (id: string | undefined) => {
  const queryClient = useQueryClient();

  const handleSaveState = async (values: IState) => {
    try {
      if (id) {
        await updateState({ ...values, _id: id } as unknown as IState);
        toast.success("State updated successfully!");
      } else {
        const result = await addState(values);
        if (result._id) toast.success("State saved successfully!");
      }

      // Invalidate the query to refresh the states table
      queryClient.invalidateQueries({ queryKey: ["states"] });
    } catch (error) {
      toast.error("Failed to save state.");
      console.error("Error saving state:", error);
    }
  };

  return {
    handleSaveState,
  };
};
