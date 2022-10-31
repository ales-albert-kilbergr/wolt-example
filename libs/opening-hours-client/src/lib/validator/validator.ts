import Ajv, { ValidateFunction, JSONSchemaType } from 'ajv';
import { IOpeningHoursInputSchema } from '../schema';
import { OpeningHoursValidatorError } from './validator.error';

export class OpeningHoursValidator {
  private ajv = new Ajv();

  private validator?: ValidateFunction;

  constructor(private schema: JSONSchemaType<IOpeningHoursInputSchema>) {}
  /**
   * @throws {OpeningHoursValidatorError}
   */
  public async validate(input: unknown) {
    if (!this.validator) {
      this.validator = this.ajv.compile(this.schema);
    }

    if (!this.validator(input)) {
      throw OpeningHoursValidatorError.InvalidInput(
        this.schema,
        input,
        this.validator.errors
      );
    }
    return input;
  }
}
