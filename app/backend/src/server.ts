import cors from "cors";
import "dotenv/config";
import express, { Express, Request, Response } from "express";

import { configurePassport } from "@/config/passport.js";
import { MajorController } from "@/controllers/MajorController.js";
import authRouter from "@/routers/authRouter.js";
import { MajorRouter } from "@/routers/MajorRouter.js";
import someRouter from "@/routers/someRouter.js";
import { MajorServiceImpl } from "@/service/MajorService.js";
import { AiServiceImpl } from "@/service/ai/AiService.js"
import { PrismaClient } from "@prisma/client";

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

configurePassport();

const prismaClient = new PrismaClient();


const aiService = new AiServiceImpl(prismaClient, "http://localhost:8001")

const majorService = new MajorServiceImpl(aiService, prismaClient);
const majorController = new MajorController(majorService);
const majorRouter = new MajorRouter(majorController);

const router = express.Router();
router.use("/auth", authRouter);
router.use("/major", majorRouter.router);
router.use(someRouter);

app.use("/api/v1", router);
app.get("/", (req: Request, res: Response) => res.send("ok"));

app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
