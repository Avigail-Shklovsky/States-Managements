import StateModel from "../models/state";

jest.mock("mongoose", () => {
  const mongoose = require("mongoose-mock");
  return mongoose;
});

test("creates a state in the database", async () => {
  const state = new StateModel({
    name: "USA",
    flag: "flag.png",
    population: 20,
    region: "North America",
  });
  await state.save();
  expect(state.name).toBe("USA");
});
