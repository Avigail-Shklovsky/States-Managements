import express from "express";
import {
  createCity,
  getCities,
  updateCity,
  deleteCity,
  getCityById,
} from "../controllers/cityController";

const citiesRoutes = express.Router();

citiesRoutes.post("/", createCity);
citiesRoutes.get("/", getCities);
citiesRoutes.get("/:id", getCityById);
citiesRoutes.put("/:id", updateCity);
citiesRoutes.delete("/:id", deleteCity);


export default citiesRoutes;
