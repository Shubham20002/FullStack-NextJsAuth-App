
import mongoose from "mongoose";

export async function connect() {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("MongoDB already connected ✅");
      return;
    }

    await mongoose.connect(process.env.MONGO_URI!, {
      dbName: "your-db-name", // optional, if your URI doesn't already include db name
    });

    console.log("MongoDB connected successfully 🚀");
  } catch (error) {
    console.error("MongoDB connection failed ❌", error);
    throw new Error("MongoDB connection error");
  }
}
