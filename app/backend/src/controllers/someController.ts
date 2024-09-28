import { functionDTO } from "@common/DTOs/dtos.js";
import { Request, Response } from "express";

export function doSomething(req: Request, res: Response) {
  res.json({
    message: "Hello World" + functionDTO(),
  });
}

export function doSomethingPrivate(req: Request, res: Response) {
  res.json({
    message: "Hello Private World",
  });
}
