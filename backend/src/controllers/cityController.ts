import { Request, Response } from "express";
import CityModel, { ICity } from "../models/city";
import { sanitizeString } from "../utils/sanitizeInput";
import StateModel from "../models/state";

// Create a new city
export const createCity = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, stateId } = req.body;

    if (!stateId) {
      res.status(400).json({ error: "State ID is required" });
      return;
    }
    const sanitizedBody = { name: sanitizeString(name) };

    const newCity = new CityModel(sanitizedBody);
    const savedCity = await newCity.save();

    const updatedState = await StateModel.findByIdAndUpdate(
      stateId,
      { $push: { cities: savedCity._id } },
      { new: true }
    );

    if (!updatedState) {
      res.status(404).json({ error: "State not found" });
      return;
    }

    res.status(201).json({savedCity,stateId});
  } catch (error) {
    console.error("Error in createCity:", error);
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
    const sanitizedBody = {
      name: sanitizeString(req.body.name)
    };

    const updatedCity = await CityModel.findByIdAndUpdate(
      id.toString(),
      sanitizedBody as unknown as ICity,
      { new: true }
    );

    res.status(200).json(updatedCity);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Delete a City
export const deleteCity = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const cityToDelete = await CityModel.findByIdAndDelete(id);
    if (!cityToDelete) {
      res.status(404).json({ message: "City not found" });
      return;
    }

    await StateModel.updateOne(
      { cities: id }, 
      { $pull: { cities: id } } 
    );

    res.status(200).json({ message: "City deleted successfully" });
  } catch (error) {
    console.error("Error deleting city:", error);
    res.status(500).json({ error: error });
  }
};
