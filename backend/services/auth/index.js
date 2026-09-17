import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);
import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import router from "./routes/auth.routes.js";
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ service: "auth", status: "ok" });
});

app.use("/", router);

app.listen(port, async () => {
  await connectDB();
  console.log(`auth service running on ${port}`);
});
