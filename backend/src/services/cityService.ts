import CityModel, { ICity } from "../models/city";
import StateModel from "../models/state";
import { sanitizeString } from "../utils/sanitizeInput";

// Create a new city
export const createCityService = async (name: string, stateId: string) => {
  if (!stateId) throw new Error("State ID is required");

  const sanitizedName = sanitizeString(name);
  const newCity = new CityModel({ name: sanitizedName });
  const savedCity = await newCity.save();

  const updatedState = await StateModel.findByIdAndUpdate(
    stateId,
    { $push: { cities: savedCity._id } },
    { new: true }
  );

  if (!updatedState) throw new Error("State not found");

  return { savedCity, stateId };
};

// Get all cities
export const getCitiesService = async () => {
  return await CityModel.find();
};

// Get a city by ID
export const getCityByIdService = async (id: string) => {
  const city = await CityModel.findById(id);
  if (!city) throw new Error("City not found");
  return city;
};

// Update a city
export const updateCityService = async (id: string, name: string) => {
  const sanitizedName = sanitizeString(name);
  return await CityModel.findByIdAndUpdate(id, { name: sanitizedName }, { new: true });
};

// Delete a city
export const deleteCityService = async (id: string) => {
  const cityToDelete = await CityModel.findByIdAndDelete(id);
  if (!cityToDelete) throw new Error("City not found");

  await StateModel.updateOne({ cities: id }, { $pull: { cities: id } });

  return { message: "City deleted successfully" };
};
