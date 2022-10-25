import mongoose from "mongoose";
import Tuit from "../models/Tuit";

const TuitSchema = new mongoose.Schema<Tuit>({
  tuit: { type: String, required: true },
  postedOn: { type: Date, default: Date.now },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel',
    required: true,
  },
  likesCount: Number,
}, { collection: 'tuits' });

export default TuitSchema;

