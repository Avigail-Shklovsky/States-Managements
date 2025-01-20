import mongoose, { Schema } from "mongoose";

interface State {
  name: string;
  flag: string;
  population: number;
  region: String;
}
const StateSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  flag: { type: String, required: true },
  population: { type: Number, required: true },
  region: { type: String, required: true },
});

// Create a model using the schema
const StateModel = mongoose.model<State>("States", StateSchema);

export default StateModel;
