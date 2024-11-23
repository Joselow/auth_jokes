import { BaseError } from "./index.js";

export class ServerError extends BaseError {
  constructor (message: string = 'Internal server error', errors: any = null) {
    super(message, 503, errors)
  }
}