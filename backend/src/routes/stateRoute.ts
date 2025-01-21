import express from "express";
import {
  createState,
  getStates,
  updateState,
  deleteState,
  getStateById,
} from "../controllers/stateController";
import initializeData from "../services/fetchStatesData";

const stateRoutes = express.Router();

stateRoutes.post("/", createState);
stateRoutes.get("/", getStates);
stateRoutes.get("/:id", getStateById);
stateRoutes.put("/:id", updateState);
stateRoutes.delete("/:id", deleteState);
stateRoutes.get("/initialDB", initializeData);


export default stateRoutes;
