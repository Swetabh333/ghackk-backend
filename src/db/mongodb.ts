import mongoose from "mongoose";

//Function for connecting to the database
const connectToDatabase = async () => {
  try {
    const url = process.env.MONGODB_URI;
    if (url) {
      await mongoose.connect(url);
      console.log("Connected to database");
    }
  } catch (err) {
    console.log(
      `Error connecting to database : ${
        err instanceof Error ? err.message : String(err)
      }`,
    );
  }
};

export default connectToDatabase;
