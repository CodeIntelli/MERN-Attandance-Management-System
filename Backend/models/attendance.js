import mongoose from "mongoose";

const attenDanceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    index: true,
    ref: "User",
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

let attenDance = mongoose.model("attenDance", attenDanceSchema);
export default attenDance;
