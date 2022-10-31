export type weekday =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

const WEEKDAYS: weekday[] = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

export function isWeekday(value: unknown): value is weekday {
  return (WEEKDAYS as unknown[]).includes(value);
}
/**
 * Cast value into weekday type
 */
export function weekday(value: unknown): weekday {
  if (!isWeekday(value)) {
    throw new TypeError(`Value "${value}" is not a valid weekday`);
  }
  return value;
}

export function weekdayToIndex(value: weekday): number {
  return WEEKDAYS.indexOf(value);
}

export function indexToWeekday(index: number): weekday {
  return WEEKDAYS[index];
}

export function compareWeekdaysAsc(a: weekday, b: weekday) {
  return weekdayToIndex(a) - weekdayToIndex(b);
}
