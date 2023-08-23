import express, { Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { router } from "./router/index.js";
import { waiting } from "./middlewares/waiting.js";

const app = express();
const PORT = 3000;

app.use(cors({ credentials: true, origin: "http://localhost:3001" }));
app.use(cookieParser());
app.use(express.json());

app.use(waiting);
app.use("/api", router);

async function start() {
  try {
    app.listen(PORT, () => {
      console.log(`Example app listening on PORT ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
