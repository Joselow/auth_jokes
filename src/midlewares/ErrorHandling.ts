import 'dotenv/config'

import { NextFunction, Request, Response } from "express";
import { error } from "../utils/responses.js";

export const errorHandling = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (String(process.env.NODE_ENV).toLowerCase() !== "production" || String(process.env.NODE_ENV).toLowerCase() !== "prod" ) {
    console.log('****ERRRORRR****',err);
  }
  const { statusCode = 500, message, errors = null} = err
  error(res, statusCode, message, errors )
}