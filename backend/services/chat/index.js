import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);
import express from "express";
import router from "./routes/chat.routes.js";
import connectDB from "./config/db.js";

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use("/", router);

app.get("/", (_req, res) => {
  res.status(200).json({ service: "chat", status: "ok" });
});

const startServer = async () => {
  try {
    await connectDB();
  } catch (error) {
    console.error(
      "MongoDB connection initialization failed. The service will still start, but DB-backed routes may fail until the cluster is reachable.",
    );
  }

  app.listen(port, () => {
    console.log(`chat service running on ${port}`);
  });
};

startServer();
