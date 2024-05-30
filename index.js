import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Database/config.js";
import taskRouter from './Router/taskrouter.js'


dotenv.config();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
connectDB();

app.get("/", (req, res) => {
  res.status(200).send("Hi welcome to our API");
});

app.use("/api",taskRouter)

app.listen(process.env.PORT, () => {
  console.log("App is running on the port");
});
