import mongoose, { Document, Schema } from "mongoose";

export interface IState extends Document {
  name: string;
  flag: string;
  population: number;
  region: String;
  cities:String[]
}
const StateSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  flag: { type: String, required: true },
  population: { type: Number, required: true },
  region: { type: String, required: true },
  cities:[{ type: mongoose.Schema.Types.ObjectId, ref: "Cities" }],

});

// Create a model using the schema
const StateModel = mongoose.model<IState>("States", StateSchema);

export default StateModel;

