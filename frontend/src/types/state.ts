import { Types } from "mongoose";

export interface IState {
  _id: Types.ObjectId;
  name: string;
  flag: string;
  population: number;
  region: string;
}
