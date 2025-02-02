import { Request, Response } from "express";
import CityModel, { ICity } from "../models/city";

// Create a new city
export const createCity = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, flag, population, region } = req.body;
    const newCity: ICity = new CityModel({ name, flag, population, region });
    const savedCity = await newCity.save();
    res.status(201).json(savedCity);
  } catch (error) {
    console.error("Error in createCity:", error); // Log the error
    res.status(500).json({ error: error });
  }
};

// Get all cities
export const getCities = async (req: Request, res: Response): Promise<void> => {
  try {
    const cities = await CityModel.find();
    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Get City by id
export const getCityById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const City = await CityModel.findById(id.toString());
    if (!City) {
      res.status(404).json({ message: "City not found" });
      return;
    }
    res.status(200).json(City);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Update a City
export const updateCity = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name} = req.body;

    const updatedCity = await CityModel.findByIdAndUpdate(
      id.toString(),
      { name } as ICity,
      { new: true }
    );

    res.status(200).json(updatedCity);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Delete a City
export const deleteCity = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const CityToDelete = await CityModel.findByIdAndDelete(id);

    if (!CityToDelete) {
      res.status(404).json({ message: "City not found" });
      return;
    }
    res.status(200).json({ message: "City deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
