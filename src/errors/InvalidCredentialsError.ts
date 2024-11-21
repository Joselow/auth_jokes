import { BaseError } from "./index.js";

export class InvalidCredentialsError extends BaseError {
  constructor (message: string = 'Invalid credentials', errors: any = null) {
    super(message, 401, errors)
  }
}
