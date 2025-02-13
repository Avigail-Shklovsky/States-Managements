import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { deleteCity } from "../../services/cityApi";
import { IState } from "../../types/state";

export const useDeleteCity = () => {
  const queryClient = useQueryClient();

  const handleDelete = async (cityId: string) => {
    toast
      .promise(deleteCity(cityId), {
        loading: "Deleting...",
        success: "City deleted successfully!",
        error: "Failed to delete city.",
      })
      .then(() => {
        queryClient.setQueryData(
          ["states"],
          (oldData: IState[] | undefined) => {
            if (!oldData) return oldData;

            return oldData.map((state) => ({
              ...state,
              cities: state.cities.filter(
                (city) => city._id.toString() !== cityId
              ),
            }));
          }
        );
      });
  };

  return { handleDelete };
};

export default useDeleteCity;
