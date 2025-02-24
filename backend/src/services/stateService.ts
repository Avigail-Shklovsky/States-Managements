import StateModel, { IState } from "../models/state";
import validator from "validator";
import { sanitizeString } from "../utils/sanitizeInput";

// Create a new state
export const createStateService = async (stateData: any): Promise<IState> => {
  const sanitizedBody = {
    name: sanitizeString(stateData.name),
    flag: sanitizeString(stateData.flag),
    population: validator.isNumeric(stateData.population) ? stateData.population : 0,
    region: sanitizeString(stateData.region),
  };

  const newState: IState = new StateModel(sanitizedBody);
  return await newState.save();
};

// Get all states
export const getStatesService = async (): Promise<IState[]> => {
  return await StateModel.find().populate("cities");
};

// Get state by ID
export const getStateByIdService = async (id: string): Promise<IState | null> => {
  return await StateModel.findById(id).populate("cities");
};

// Update a state
export const updateStateService = async (id: string, stateData: any): Promise<IState | null> => {
  const sanitizedBody = {
    name: sanitizeString(stateData.name),
    flag: sanitizeString(stateData.flag),
    population: validator.isNumeric(stateData.population) ? stateData.population : 0,
    region: sanitizeString(stateData.region),
  };

  return await StateModel.findByIdAndUpdate(id, sanitizedBody, { new: true });
};

// Delete a state
export const deleteStateService = async (id: string): Promise<IState | null> => {
  return await StateModel.findByIdAndDelete(id);
};
