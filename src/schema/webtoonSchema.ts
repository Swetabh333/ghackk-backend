import mongoose, { Document, Schema } from "mongoose";

interface wt extends Document {
  Name: string;
  Creator: string;
  Genre: string;
  short_description: string;
  img_url: string;
}

const webtoonSchema = new Schema<wt>({
  Name: {
    type: String,
    required: true,
    unique: true,
  },
  Creator: {
    type: String,
    required: true,
  },
  Genre: {
    type: String,
    required: true,
  },
  short_description: {
    type: String,
    required: true,
  },
  img_url: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Webtoon", webtoonSchema);
