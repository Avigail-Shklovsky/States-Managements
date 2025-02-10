import mongoose, { Document, Schema } from "mongoose";

export interface IMessage extends Document {
  userId: string;
  actionType:string;
  read: boolean;
  approved : boolean;
  dateOpen:Date;
  dateClose:Date;
}
const MessageSchema: Schema = new Schema({
    userId: { type: String, required: true },
    actionType :  { type: String, required: true},
    read: { type: Boolean, required: true },
    approved :  { type: Boolean, required: true },
    dateOpen :  { type: Date, required: true },
    dateClose : { type: Date}, 

});

const MessageModel = mongoose.model<IMessage>("Messages", MessageSchema);

export default MessageModel;

