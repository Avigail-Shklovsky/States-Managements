import request from "supertest";
import express from "express";
import stateRoutes from "../routes/stateRoutes";
import { IState } from "../models/state";
import StateModel from "../models/state";
import mongoose from "mongoose";

const app = express();
app.use(express.json()); // Middleware to parse JSON
app.use("/states", stateRoutes);

// Properly mock the StateModel
jest.mock("../models/state", () => {
    const originalModule = jest.requireActual("../models/state");
  
    return {
      ...originalModule,
      find: jest.fn(),
      findById: jest.fn(),
      findByIdAndUpdate: jest.fn(),
      findByIdAndDelete: jest.fn(),
      create: jest.fn(),
      // Mock the default export constructor
      default: jest.fn().mockImplementation(() => {
        return {
          save: jest.fn(),  // Mock the save method
        };
      }),
    };
  });
  
  
describe("State Routes", () => {
//   test("POST /states - creates a new state", async () => {
//     const mockState = {
//       name: "USA",
//       flag: "usa.png",
//       population: 330000000,
//       region: "North America",
//     };
//     jest
//       .spyOn(StateModel.prototype, "save")
//       .mockResolvedValue(mockState as any);

//     const res = await request(app).post("/states").send(mockState);

//     console.log("status is------", res.status, "body is-----", res.body);
//     expect(res.status).toBe(201);
//     expect(res.body).toEqual(mockState);
//   });

  test("GET /states - fetch all states", async () => {
    const mockStates = [
      {
        name: "USAAAA",
        flag: "usa.png",
        population: 330000000,
        region: "North America",
      },
      {
        name: "Canada",
        flag: "canada.png",
        population: 38000000,
        region: "North America",
      },
    ];

    jest.spyOn(StateModel, "find").mockResolvedValue(mockStates as any);

    const res = await request(app).get("/states");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockStates);
  });

  test("PUT /states/:id - updates a state", async () => {
    const mockUpdatedState = {
      name: "USA Updated",
      flag: "usa-updated.png",
      population: 340000000,
      region: "North America",
    };

    jest
      .spyOn(StateModel, "findByIdAndUpdate")
      .mockResolvedValue(mockUpdatedState as any);

    const res = await request(app).put("/states/123").send(mockUpdatedState);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockUpdatedState);
  });

  test("DELETE /states/:id - deletes a state", async () => {
    jest.spyOn(StateModel, "findByIdAndDelete").mockResolvedValue(true as any);

    const res = await request(app).delete("/states/123");

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("State deleted successfully");
  });
});
