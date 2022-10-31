import { ErrorObject, JSONSchemaType } from 'ajv';
import { IOpeningHoursInputSchema } from '../schema';
import { OpeningHoursValidatorErrorCode } from './validator-error-code.enum';

export class OpeningHoursValidatorError<
  P extends Record<string, any>
> extends Error {
  constructor(
    public readonly code: OpeningHoursValidatorErrorCode,
    public readonly reason: string,
    public readonly params?: P
  ) {
    super(`[${OpeningHoursValidatorError.name}.${code}]: ${reason}`);
  }

  public static InvalidInput(
    schema: JSONSchemaType<IOpeningHoursInputSchema>,
    input: unknown,
    errors?: null | ErrorObject[]
  ) {
    return new OpeningHoursValidatorError<{
      schema: JSONSchemaType<IOpeningHoursInputSchema>;
      input: unknown;
      errors?: null | ErrorObject[];
    }>(
      OpeningHoursValidatorErrorCode.INVALID_INPUT,
      `Invalid opening hours source entry!`,
      { errors, schema: schema, input }
    );
  }
}
