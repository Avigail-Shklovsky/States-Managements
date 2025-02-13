import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addCity } from "../../services/cityApi";
import { ICity } from "../../types/city";
import { IState } from "../../types/state";

export interface CreateCityResponse {
  savedCity: ICity;
  stateId: string;
}
export const useCreateCity = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    CreateCityResponse,
    Error,
    { stateId: string; cityName: string }
  >({
    mutationFn: ({ stateId, cityName }) => addCity({ stateId, cityName }),

    onSuccess: (data) => {
      if (data?.savedCity?._id && data?.stateId) {
        toast.success("The new city has been added successfully.");

        queryClient.setQueryData(
          ["states"],
          (oldData: IState[] | undefined) => {
            if (!oldData) return oldData;

            return oldData.map((state) =>
              state._id.toString() === data.stateId
                ? {
                    ...state,
                    cities: [...state.cities, data.savedCity],
                  }
                : state
            );
          }
        );

        queryClient.invalidateQueries({ queryKey: ["states"] });
      }
    },

    onError: () => {
      toast.error("Failed to add the new city.");
    },
  });
  return mutation;
};
