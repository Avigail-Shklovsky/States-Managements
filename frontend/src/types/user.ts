import { Types } from "mongoose";

export interface IUser {
  [x: string]: any;
     _id: Types.ObjectId;
    firstName: string;
    lastName: string;
    userName : string;
    email:string;
    phone:string;
    profileImage:string;
    password:string;
    changedDate:Date;
    auth:string[];
    messages: string[];
  }