import mongoose from "mongoose";

const attenDanceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    index: true,
    ref: "User",
  },
  inTime: {
    type: String,
    default: new Date().toLocaleString(),
  },
  outTime: {
    type: String,
    default: new Date().toLocaleString(),
  },
  timer: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

let attenDance = mongoose.model("attenDance", attenDanceSchema);
export default attenDance;
