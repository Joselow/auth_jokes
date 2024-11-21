import { BaseError } from "./index.js";

export class NotFoundError extends BaseError {
  constructor(message: string = 'Not found', errors: any = null) {
    super(message, 404, errors);
  }
}