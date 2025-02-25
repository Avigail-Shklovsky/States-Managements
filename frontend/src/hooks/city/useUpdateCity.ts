import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCity } from "../../services/api/cityApi";
import { ICity } from "../../types/city";
import { IState } from "../../types/state";

export const useUpdateCityById = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ city }: { city: ICity }) => updateCity(city),
    onSuccess: (data) => {
      if (data?._id) {
        toast.success("City updated successfully!");

        queryClient.setQueryData(
          ["states"],
          (oldData: IState[] | undefined) => {
            if (!oldData) return oldData;
            return oldData.map((state) => ({
              ...state,
              cities: state.cities.map((city) =>
                city._id === data._id ? data : city
              ),
            }));
          }
        );
        queryClient.invalidateQueries({ queryKey: ["states"] });
      }
    },
    onError: () => {
      toast.error("Failed to update city.");
    },
  });

  return mutation;
};
