import express from "express";
const app = express();
import { APP_PORT } from "./config";
import routes from "./routes";
import "./database";
import errorDetails from "./middleware/error";
import cookieParser from "cookie-parser";
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/", routes);

// Middleware for Error
app.use(errorDetails);
// when we declare any undefine variable then this error occur so we can handle this error here
process.on("uncaughtException", (err) => {
  console.log(err.message);
  console.log(`Shutting down the server due to uncaught exception`);
  process.exit(1);
});

let server = app.listen(APP_PORT, () => {
  console.log("Server Connected");
});

// console.log(youtube);

// * unhandled promise rejection: it occur when we are put incorrect mongodb string in short it accept all mongodb connection errors
//  * when we are handling this error we dont need to put catch block in database connection file
process.on("unhandledRejection", (err) => {
  console.log(err.message);
  console.log(`Shutting down the server due to unhandled promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});
