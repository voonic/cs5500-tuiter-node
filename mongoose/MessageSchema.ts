import mongoose, { Schema } from "mongoose";
import Message from "../models/Message";

const MessageSchema = new mongoose.Schema<Message>({
  message: { type: Schema.Types.String },
  to: { type: Schema.Types.ObjectId, ref: "UserModel" },
  from: { type: Schema.Types.ObjectId, ref: "UserModel" },
  sentOn: { type: Schema.Types.Date },
}, { collection: "messages" });

export default MessageSchema;