import { Request, Response } from "express";
import {
  createStateService,
  getStatesService,
  getStateByIdService,
  updateStateService,
  deleteStateService,
} from "../services/stateService";

// Create a new state
export const createState = async (req: Request, res: Response): Promise<void> => {
  try {
    const savedState = await createStateService(req.body);
    res.status(201).json(savedState);
  } catch (error) {
    console.error("Error in createState:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all states
export const getStates = async (req: Request, res: Response): Promise<void> => {
  try {
    const states = await getStatesService();
    res.status(200).json(states);
  } catch (error) {
    console.error("Error in getStates:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get state by ID
export const getStateById = async (req: Request, res: Response): Promise<void> => {
  try {
    const state = await getStateByIdService(req.params.id);
    if (!state) {
      res.status(404).json({ message: "State not found" });
      return;
    }
    res.status(200).json(state);
  } catch (error) {
    console.error("Error in getStateById:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a state
export const updateState = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedState = await updateStateService(req.params.id, req.body);
    if (!updatedState) {
      res.status(404).json({ message: "State not found" });
      return;
    }
    res.status(200).json(updatedState);
  } catch (error) {
    console.error("Error in updateState:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a state
export const deleteState = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedState = await deleteStateService(req.params.id);
    if (!deletedState) {
      res.status(404).json({ message: "State not found" });
      return;
    }
    res.status(200).json({ message: "State deleted successfully" });
  } catch (error) {
    console.error("Error in deleteState:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
