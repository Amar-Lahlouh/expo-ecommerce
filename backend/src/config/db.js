import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(ENV.DB_URL);
    console.log("connected to Db");
  } catch (err) {
    console.log(err);
    console.log("MONGOOSE CONNECTION ERROR");
    process.exit(1); //1 means failure 0 means success
  }
};
