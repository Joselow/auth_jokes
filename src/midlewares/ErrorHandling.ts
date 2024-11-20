import { NextFunction, Request, Response } from "express";
import { error } from "../utils/responses";

export const errorHandling = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.log('****ERRRORRR****',err);
  const { statusCode = 500, message, errors = null} = err
  error(res, statusCode, message, errors )
}