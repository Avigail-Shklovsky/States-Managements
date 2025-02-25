import axios from "axios";
import { ICity } from "../../types/city";
import { CreateCityResponse } from "../../hooks/city/useCreateCity";

export const fetchCities = async (): Promise<ICity[]> => {
  const response = await axios.get("http://localhost:5000/cities");
  return response.data;
};

export const deleteCity = async (id: string): Promise<ICity[]> => {
  const response = await axios.delete(`http://localhost:5000/cities/${id}`);
  return response.data;
};

export const addCity = async ({
  stateId,
  cityName,
}: {
  stateId: string;
  cityName: string;
}): Promise<CreateCityResponse> => {
  const response = await axios.post("http://localhost:5000/cities", {
    name: cityName,
    stateId,
  });
  return {
    savedCity: response.data.savedCity,
    stateId: response.data.stateId,
  };
};

export const updateCity = async (updatedCity: ICity): Promise<ICity> => {
  const response = await axios.put(
    `http://localhost:5000/cities/${updatedCity._id}`,
    updatedCity
  );
  return response.data;
};
