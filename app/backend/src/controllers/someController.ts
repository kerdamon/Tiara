import { testF } from "@common/DTOs/test.js";
import { Request, Response } from "express";

export function doSomething(req: Request, res: Response) {
  res.json({
    message: "Hello World" + testF(),
  });
}

export function doSomethingPrivate(req: Request, res: Response) {
  res.json({
    message: "Hello Private World",
  });
}
