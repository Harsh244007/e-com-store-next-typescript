import mongoose from "mongoose";

const url = "mongodb+srv://harsh:harsh@cluster0.ugwk8b9.mongodb.net/ecom";

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(url);
    console.log("connection successful");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    throw error;
  }
};
