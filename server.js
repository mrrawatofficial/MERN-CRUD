import express from "express";
import mongoose from "mongoose";
import Cors from "cors";
import dotenv from "dotenv";
import router from "./router/postRouter.js";
import userRouter from "./router/userRouter.js";

dotenv.config();
var app = express();
var port = process.env.PORT || 5000;

//middlewares
app.use(express.json());
app.use(Cors());

//connection to mongoose database
mongoose
  .connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

//root url
app.get("/", function (req, res) {
  res.send("Welcome boiiiiiiiii");
});
app.use("/api/blog", router);
app.use("/api/user", userRouter);

app.listen(port);
