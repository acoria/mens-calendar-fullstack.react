import express from "express";
import { initializeModels } from "./db/initializeModels";
import { PeriodController } from "./controllers/PeriodController";
import { PeriodItemController } from "./controllers/PeriodItemController";

const initialize = async () => {
  await initializeModels(false);
};

initialize();

const server = express();
server.use(express.json({ limit: "2mb" }));

server.use((_, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});
server.use("/api", new PeriodController().router);
server.use("/api", new PeriodItemController().router)

server.listen(5000);
