import express from "express";
import { initializeModels } from "./db/initializeModels";

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

server.listen(5000);
