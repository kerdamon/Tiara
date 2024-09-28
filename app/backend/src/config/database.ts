import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

export async function connectToMongo() {
  try {
    await mongoose.connect(MONGO_URI!);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
}
