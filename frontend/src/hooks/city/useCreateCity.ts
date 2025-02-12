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

  const mutation = useMutation<CreateCityResponse, Error, { stateId: string; cityName: string }>({
    mutationFn: ({ stateId, cityName }) => addCity({ stateId, cityName }), // Create new city

    onSuccess: (data) => {
      if (data?.savedCity?._id && data?.stateId) {
        toast.success("The new city has been added successfully.");

        // Update the states cache by adding the new city to the corresponding state's cities array
        queryClient.setQueryData(["states"], (oldData: IState[] | undefined) => {
          if (!oldData) return oldData; // Return the old data if no states exist

          // Find the state by its ID and add the new city to its cities array
          return oldData.map((state) =>
            state._id.toString() === data.stateId // Ensure we're adding the city to the correct state
              ? {
                  ...state,
                  cities: [...state.cities, data.savedCity], // Add the new city to the state's cities array
                }
              : state
          );
        });

        // Optionally, invalidate the query to re-fetch data, if necessary
        queryClient.invalidateQueries({ queryKey: ["states"] });
      }
    },

    onError: () => {
      toast.error("Failed to add the new city.");
    },
  });
  return mutation;
};
