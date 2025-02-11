import { Types } from "mongoose";

export interface IMessage  {
    _id: Types.ObjectId;
    userId: string;
    actionType:string;
    read: boolean;
    approved : boolean;
    dateOpen:Date;
    dateClose:Date;
  }