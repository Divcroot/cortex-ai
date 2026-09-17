import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import router from "./routes/billing.routes.js";
dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

app.use("/", router);

app.get("/", (_req, res) => {
  res.status(200).json({ service: "billing", status: "ok" });
});

app.listen(port, async () => {
  await connectDB();
  console.log(`billing service running on ${port}`);
});
