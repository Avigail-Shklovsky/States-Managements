import mongoose, { Schema } from "mongoose";
const StateSchema = new Schema({
    name: { type: String, required: true, unique: true },
    flag: { type: String, required: true },
    population: { type: Number, required: true },
    region: { type: String, required: true },
});
// Create a model using the schema
const StateModel = mongoose.model("States", StateSchema);
export default StateModel;
