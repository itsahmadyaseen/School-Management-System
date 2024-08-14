import mongoose from "mongoose";

export const connection = async () => {
  try {
    await mongoose.connect(process.env.URI);
    console.log("Database Connected!");
  } catch (error) {
    console.log("Error connecting to database", error);
  }
};
