import mongoose from "mongoose";

const url = "mongodb://127.0.0.1:27017/ecom";

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(url);
    console.log("connection successful and check your mongo url");
  } catch (error) {
    console.error("enter your mongo url:", error);
    throw error;
  }
};
