import mongoose, { Document, Schema } from "mongoose";

interface fav {
  Name: string;
  User: string;
}

const favSchema = new Schema<fav>({
  Name: {
    type: String,
    required: true,
  },
  User: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Favourites", favSchema);
