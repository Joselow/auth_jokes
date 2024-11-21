import { BaseError } from "./index.js";

export class UniqueDataError extends BaseError {
  constructor (message: string = 'Duplicated data', errors: any = null) {
    super(message, 409, errors)
  }
}