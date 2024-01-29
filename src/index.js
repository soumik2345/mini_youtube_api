import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.error(`express server error : ${error}`);
    });
    app.listen(port, () => {
      console.log(`server is running at port : ${port}`);
    });
  })
  .catch((error) => {
    console.error("mongodb connection error :", error);
  });
