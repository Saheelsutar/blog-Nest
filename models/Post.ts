import mongoose, { Schema, Document } from "mongoose";

export interface IPost extends Document {
  id: string;
  title: string;
  content: string;
  authorName:string;
  authorId: mongoose.Types.ObjectId;
  image: string; 
  createdAt: Date;
}

const PostSchema: Schema<IPost> = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  authorName: { type: String, required: true },
  authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  image: { type: String, required: false }, 
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);
