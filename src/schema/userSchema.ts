import mongoose, { Document, Schema } from "mongoose";

interface user extends Document {
  username: string;
  email: string;
  password: string;
}

const userSchema = new Schema<user>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model("User", userSchema);
