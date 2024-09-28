import { DegreeService } from "@/service/DegreeService.js";
import { Request, Response } from "express";

export class DegreeController {
  degreeService: DegreeService;

  constructor(degreeService: DegreeService) {
    this.degreeService = degreeService;
    this.getDegreesByPrompt = this.getDegreesByPrompt.bind(this); // JS madness
  }

  async getDegreesByPrompt(req: Request, res: Response) {
    const query = req.body.query;
    const degrees = await this.degreeService.getDegreesByQuery(query)
    res.json(degrees)
  }
}
