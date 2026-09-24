import express, { Application } from "express";
import { toNodeHandler } from "better-auth/node";
import { postRouter } from "./modules/post/post.router";
import { auth } from "./lib/auth";
import cors from "cors";

const app: Application = express();

app.all('/api/auth/*splat', toNodeHandler(auth));

app.use(cors({
  origin: process.env.APP_URL || "http://localhost:4000",
  credentials: true
}))

app.use(express.json());

app.use("/posts", postRouter)

app.get("/", (_req, res) => {
  res.status(200).send("Server is running");
});

export default app;
