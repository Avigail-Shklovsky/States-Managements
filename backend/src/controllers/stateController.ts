import { Request, Response } from "express";
import StateModel, { IState } from "../models/state";

// Create a new state
export const createState = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, flag, population, region } = req.body;
    const newState: IState = new StateModel({ name, flag, population, region });
    const savedState = await newState.save();
    res.status(201).json(savedState);
  } catch (error) {
    console.error("Error in createState:", error); // Log the error
    res.status(500).json({ error: error });
  }
};

// Get all states
export const getStates = async (req: Request, res: Response): Promise<void> => {
  try {
    const states = await StateModel.find();
    res.status(200).json(states);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Get state by id
export const getStateById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const state = await StateModel.findById(id.toString());
    if (!state) {
      res.status(404).json({ message: "State not found" });
      return;
    }
    res.status(200).json(state);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Update a state
export const updateState = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, flag, population, region } = req.body;

    const updatedState = await StateModel.findByIdAndUpdate(
      id.toString(),
      { name, flag, population, region } as IState,
      { new: true }
    );

    res.status(200).json(updatedState);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Delete a state
export const deleteState = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const stateToDelete = await StateModel.findByIdAndDelete(id);

    if (!stateToDelete) {
      res.status(404).json({ message: "State not found" });
      return;
    }
    res.status(200).json({ message: "State deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
