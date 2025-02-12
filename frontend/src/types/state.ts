import { Types } from "mongoose";
import { ICity } from "./city";

export interface IState {
  _id: Types.ObjectId;
  name: string;
  flag: string;
  population: number;
  region: string;
  cities: ICity[];
}
