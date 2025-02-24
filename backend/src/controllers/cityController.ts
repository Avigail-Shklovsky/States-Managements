import { Request, Response } from "express";
import {createCityService,getCitiesService,getCityByIdService,updateCityService,deleteCityService} from "../services/cityService";

// Create a new city
export const createCity = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, stateId } = req.body;
    const result = await createCityService(name, stateId);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

// Get all cities
export const getCities = async (_req: Request, res: Response): Promise<void> => {
  try {
    const cities = await getCitiesService();
    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Get City by id
export const getCityById = async (req: Request, res: Response): Promise<void> => {
  try {
    const city = await getCityByIdService(req.params.id);
    res.status(200).json(city);
  } catch (error) {
    res.status(404).json({ error: error });
  }
};

// Update a City
export const updateCity = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedCity = await updateCityService(req.params.id, req.body.name);
    res.status(200).json(updatedCity);
  } catch (error) {
    res.status(400).json({ error: error});
  }
};

// Delete a City
export const deleteCity = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await deleteCityService(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ error: error });
  }
};
