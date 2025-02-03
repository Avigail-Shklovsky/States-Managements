import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  userName : string;
  email:string;
  phone:string;
  profileImage:string;
  password:string;
  changedDate:Date;
  auth:string[]
}

const UserSchema: Schema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName :  { type: String, required: true, unique:true },
    email :  { type: String, required: true, unique:true },
    phone : { type: String, required: true},
    profileImage :  { type: String, required: true},
    password :  { type: String, required: true},
    changedDate : { type: Date, required: true},
    auth :{ type: [String], required: true}


 

});

const UserModel = mongoose.model<IUser>("Users", UserSchema);

export default UserModel;

