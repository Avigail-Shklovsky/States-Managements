import axios from "axios";
import { IState } from "../../types/state";

export const fetchStates = async (): Promise<IState[]> => {
  const response = await axios.get("http://localhost:5000/states");
  return response.data;
};

export const deleteState = async (id: string): Promise<IState[]> => {
  const response = await axios.delete(`http://localhost:5000/states/${id}`);
  return response.data;
};

export const addState = async (newState: IState): Promise<IState> => {
  const response = await axios.post("http://localhost:5000/states", newState);
  return response.data;
};

export const updateState = async (updatedState: IState): Promise<IState> => {
  const response = await axios.put(
    `http://localhost:5000/states/${updatedState._id}`,
    updatedState
  );
  return response.data;
};
