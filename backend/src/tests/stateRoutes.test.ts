import request from "supertest";
import express from "express";
import stateRoutes from "../routes/stateRoutes";
import StateModel from "../models/state";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use("/states", stateRoutes);

describe("State Routes", () => {
  
  beforeEach(() => {
    const mockFind = {
      populate: jest.fn().mockResolvedValue([
        {
          _id: new mongoose.Types.ObjectId(),
          name: "USAAAA",
          flag: "usa.png",
          population: 330000000,
          region: "North America",
          cities: [{ _id: new mongoose.Types.ObjectId(), name: "New York" }],
        },
        {
          _id: new mongoose.Types.ObjectId(),
          name: "Canada",
          flag: "canada.png",
          population: 38000000,
          region: "North America",
          cities: [{ _id: new mongoose.Types.ObjectId(), name: "Ottawa" }],
        },
      ]),
    };

    jest.spyOn(StateModel, "find").mockReturnValue(mockFind as any);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("GET /states - fetch all states", async () => {
    const res = await request(app).get("/states");
    expect(res.status).toBe(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "USAAAA",
          flag: "usa.png",
          population: 330000000,
          region: "North America",
          cities: expect.arrayContaining([
            expect.objectContaining({ name: "New York" }),
          ]),
        }),
        expect.objectContaining({
          name: "Canada",
          flag: "canada.png",
          population: 38000000,
          region: "North America",
          cities: expect.arrayContaining([
            expect.objectContaining({ name: "Ottawa" }),
          ]),
        }),
      ])
    );
  });

  test("POST /states - creates a new state", async () => {
    jest.setTimeout(25000);
    const mockState = {
      _id: new mongoose.Types.ObjectId().toHexString(), 
      name: "USA",
      flag: "usa.png",
      population: 330000000,
      region: "North America",
      cities: [], 
    };

    jest.spyOn(StateModel, "create").mockResolvedValue(mockState as any);

    const res = await request(app).post("/states").send(mockState);

    console.log("status is------", res.status, "body is-----", res.body); 

    expect(res.status).toBe(201);
    expect(res.body).toEqual(expect.objectContaining(mockState));
  });


test("PUT /states/:id - updates a state", async () => {
  const stateId = new mongoose.Types.ObjectId().toHexString(); 

  const mockUpdatedState = {
    _id: stateId,
    name: "USA Updated",
    flag: "usa-updated.png",
    population: 340000000,
    region: "North America",
    cities: [], 
  };

  jest.spyOn(StateModel, "findByIdAndUpdate").mockResolvedValue(mockUpdatedState as any);

  const res = await request(app).put(`/states/${stateId}`).send(mockUpdatedState);
  expect(res.status).toBe(200);
  expect(res.body).toEqual(expect.objectContaining(mockUpdatedState));
});

  // test("DELETE /states/:id - deletes a state", async () => {
  //   jest.spyOn(StateModel, "findByIdAndDelete").mockResolvedValue(true as any);

  //   const res = await request(app).delete("/states/123");

  //   expect(res.status).toBe(200);
  //   expect(res.body.message).toBe("State deleted successfully");
  // });
  // afterAll(async () => {
  //   await mongoose.connection.close();
  // });
  
});
