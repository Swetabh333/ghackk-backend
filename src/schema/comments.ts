import mongoose, { Document, Schema } from "mongoose";

interface comment {
  comment: string;
  webtoonId: string;
}
const commentSchema = new Schema<comment>({
  comment: {
    type: String,
    required: true, // You can set this to true if the comment is mandatory
  },
  webtoonId: {
    type: String,
    required: true, // You can set this to true if the webtoonId is mandatory
  },
});

export default mongoose.model("Comments", commentSchema);
