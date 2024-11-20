import { BaseError } from ".";

export class ValidationError extends BaseError {
  constructor(message: string = 'Errores de validación', errors: any = null) {
    super(message, 400, errors);
  }
}