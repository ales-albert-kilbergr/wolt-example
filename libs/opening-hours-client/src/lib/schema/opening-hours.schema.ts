import { JSONSchemaType } from 'ajv';
import jsonSchema from './opening-hours.schema.json';

export interface IOpeningHoursWeekdayEntrySchema {
  type: 'open' | 'close';
  value: number;
}

export type IOpeningHoursWeekdaySchema = IOpeningHoursWeekdayEntrySchema[];

export type IWeekdays =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

export type IOpeningHoursInputSchema = Record<
  IWeekdays,
  IOpeningHoursWeekdaySchema
>;

export const OPENING_HOURS_SCHEMA: JSONSchemaType<IOpeningHoursInputSchema> =
  jsonSchema;
