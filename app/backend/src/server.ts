import cors from "cors";
import "dotenv/config";
import express, { Express, Request, Response } from "express";

import { connectToMongo } from "@/config/database.js";
import { configurePassport } from "@/config/passport.js";
import authRouter from "@/routers/authRouter.js";
import someRouter from "@/routers/someRouter.js";

const app: Express = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());

await connectToMongo(MONGO_URI || "");
configurePassport();

const router = express.Router();
router.use("/auth", authRouter);
router.use(someRouter);

app.use("/api/v1", router);
app.get("/", (req: Request, res: Response) => res.send("ok"));

app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
