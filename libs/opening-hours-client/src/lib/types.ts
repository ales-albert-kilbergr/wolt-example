import { weekday } from './helpers';

export interface IOpeningHoursWeekdayEntrySchema {
  type: 'open' | 'close';
  value: number;
}

export type IOpeningHoursWeekdaySchema = IOpeningHoursWeekdayEntrySchema[];

export type IOpeningHoursInputSchema = Record<
  weekday,
  IOpeningHoursWeekdaySchema
>;

export interface IOpeningHoursData {
  weekdayIndex: number;
  entries: IOpeningHoursEntry[];
}

export interface IOpeningHoursEntry {
  openAtSeconds: number;
  closeAtSeconds: number;
}
