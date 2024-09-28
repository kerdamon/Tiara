import { Document, model, Model, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  passwordHash: string;
  salt: string;
}

type UserModel = Model<IUser>;
const userSchema = new Schema<IUser, UserModel>({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  salt: { type: String, required: true },
});

export const User = model<IUser, UserModel>("User", userSchema);
