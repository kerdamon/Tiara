import express, { Router } from "express";
import { DegreeController } from "@/controllers/DegreeController.js";

export class DegreeRouter {
  public router: Router;
  private controller: DegreeController;
  constructor(degreeController: DegreeController) {
    this.router = express.Router();
    this.controller = degreeController;
    this.registerRoutes();
  }

  private registerRoutes(): void {
    this.router.post("/", this.controller.getDegreesByPrompt);
  }
}
