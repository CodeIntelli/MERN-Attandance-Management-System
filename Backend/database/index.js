import { DB_URL } from "../config";
import mongoose from "mongoose";
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((data) => {
    console.log(`Mongo DB Connected ${data.connection.host}`);
  });
