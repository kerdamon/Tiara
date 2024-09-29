import { MajorService } from "@/service/MajorService.js";
import { Request, Response } from "express";

export class MajorController {
  majorService: MajorService;

  constructor(majorService: MajorService) {
    this.majorService = majorService;
    this.getMajorsByPrompt = this.getMajorsByPrompt.bind(this); // JS madness
    this.getAllMajors = this.getAllMajors.bind(this); // JS madness
  }

  async getMajorsByPrompt(req: Request, res: Response) {
    console.log("getMajorsByPrompt");
    const query = req.body.query;
    const majors = await this.majorService.getMajorsByQuery(query);
    res.json(majors);
  }

  async getAllMajors(req: Request, res: Response) {
    console.log("getAllMajors");
    const majors = await this.majorService.getAllMajors();
    res.json(majors);
  }
}
