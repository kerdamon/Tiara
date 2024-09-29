import { MajorController } from "@/controllers/MajorController.js";
import express, { Router } from "express";

export class MajorRouter {
  public router: Router;
  private controller: MajorController;
  constructor(majorController: MajorController) {
    this.router = express.Router();
    this.controller = majorController;
    this.registerRoutes();
  }

  private registerRoutes(): void {
    this.router.post("/", this.controller.getMajorsByPrompt);
    this.router.get("/", this.controller.getAllMajors);
  }
}
