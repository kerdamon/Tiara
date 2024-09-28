import mongoose from "mongoose";


export async function connectToMongo(mongoUri: string) {
  try {
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
}

export async function disconnectFromMongo() {
  await mongoose.disconnect()
}
