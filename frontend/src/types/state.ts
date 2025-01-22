import { Types } from "mongoose";

export interface State {
  _id: Types.ObjectId;
  name: string;
  flag: string;
  population: number;
  region: string;
}
