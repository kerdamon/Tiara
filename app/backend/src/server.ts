import cors from "cors";
import "dotenv/config";
import express, { Express, Request, Response } from "express";

import { connectToMongo } from "@/config/database.js";
import { configurePassport } from "@/config/passport.js";
import authRouter from "@/routers/authRouter.js";
import someRouter from "@/routers/someRouter.js";
import { DegreeController } from "./controllers/DegreeController.js";
import { MockDegreeServiceImpl } from "./service/DegreeService.js";
import { DegreeRouter } from "./routers/DegreeRouter.js";

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

await connectToMongo();
configurePassport();

const degreeService = new MockDegreeServiceImpl();
const degreeController = new DegreeController(degreeService);
const degreeRouter = new DegreeRouter(degreeController);

const router = express.Router();
router.use("/auth", authRouter);
router.use("/degree", degreeRouter.router);
router.use(someRouter);

app.use("/api/v1", router);
app.get("/", (req: Request, res: Response) => res.send("ok"));

app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
