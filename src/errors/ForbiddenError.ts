import { BaseError } from ".";

export class ForbiddenError extends BaseError {
  constructor (message: string = 'You dont have the permissions to perform this action', errors: any = null) {
    super(message, 403, errors)
  }
}