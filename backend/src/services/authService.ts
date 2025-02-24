import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/user";
import crypto from "crypto";

export const signUpUser = async (userData: any, file: Express.Multer.File | undefined) => {
  const { firstName, lastName, userName, email, phone, password, auth } = userData;
  const profileImage = file ? file.path : null;

  if (!password) throw { status: 400, message: "Password is required" };

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingEmailUser = await UserModel.findOne({ email });
  if (existingEmailUser) throw { status: 400, message: "Email already in use" };

  const existingUserName = await UserModel.findOne({ userName });
  if (existingUserName) throw { status: 400, message: "Username already in use" };

  const user = new UserModel({
    firstName,
    lastName,
    userName,
    email,
    phone,
    profileImage,
    password: hashedPassword,
    changedDate: new Date(),
    auth,
    messages: [],
  });

  await user.save();

  const token = jwt.sign({ email, userId: user._id }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });

  return { user, token };
};



const passwordResetTokens: { [key: string]: string } = {};

export const signInService = async (userName: string, password: string) => {
  const user = await UserModel.findOne({ userName });
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });

  return { user, token };
};

export const sendResetEmailService = async (email: string) => {
  const user = await UserModel.findOne({ email });
  if (!user) return;

  const resetToken = crypto.randomBytes(32).toString("hex");
  passwordResetTokens[resetToken] = email;
  return resetToken;
};

export const resetPasswordService = async (token: string, newPassword: string) => {
  const email = passwordResetTokens[token];
  if (!email) throw new Error("Invalid token");

  const user = await UserModel.findOne({ email });
  if (!user) throw new Error("User not found");

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  delete passwordResetTokens[token];
};

