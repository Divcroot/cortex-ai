import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URL;

  if (!mongoUri) {
    throw new Error(
      "MONGODB_URL is not defined. Check the chat service .env file.",
    );
  }

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 30000,
      connectTimeoutMS: 15000,
      socketTimeoutMS: 20000,
      family: 4,
    });

    console.log("DB Connected");
  } catch (error) {
    if (error?.name === "MongooseServerSelectionError") {
      console.error(
        "MongoDB Atlas could not select a primary. Check Atlas cluster health, IP access list, and network reachability.",
      );
    }
    console.error("Db Error", error);
    throw error;
  }
};

export default connectDB;
