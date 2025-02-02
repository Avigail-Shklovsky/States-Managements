import mongoose, { Document, Schema } from "mongoose";

export interface ICity extends Document {
  name: string;
}
const CitySchema: Schema = new Schema({
  name: { type: String, required: true, unique: true }
});

// Create a model using the schema
const CityModel = mongoose.model<ICity>("Cities", CitySchema);

export default CityModel;
