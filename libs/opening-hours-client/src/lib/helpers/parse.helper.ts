import { IOpeningHoursData, IOpeningHoursInputSchema } from '../types';
import {
  compareWeekdaysAsc,
  indexToWeekday,
  isWeekday,
  weekday,
  weekdayToIndex,
} from './weekday.helper';

export interface IIndexedOpeningHoursWeekdayEntry {
  weekdayIndex: number;
  type?: 'open' | 'close';
  value?: number;
}

export enum OpeningHoursParseErrorCode {
  FIRST_ENTRY_CLOSED = 'ERR_FIRST_ENTRY_CLOSED',
  CLOSE_AFTER_CLOSED_DAY = 'ERR_CLOSE_AFTER_CLOSED_DAY',
  OPEN_BEFORE_CLOSED_DAY = 'ERR_OPEN_BEFORE_CLOSED_DAY',
  TWO_SAME_FOLLOWING_TYPES = 'ERR_TWO_SAME_FOLLOWING_TYPES',
}

export class OpeningHoursParseError<P = unknown> extends Error {
  constructor(
    public readonly code: OpeningHoursParseErrorCode,
    public readonly reason: string,
    public readonly params: P
  ) {
    super(`[${OpeningHoursParseError.name}.${code}]: ${reason}`);
  }

  public static FirstEntryClosed(weekday: weekday) {
    return new OpeningHoursParseError<{ weekday: weekday }>(
      OpeningHoursParseErrorCode.FIRST_ENTRY_CLOSED,
      `Invalid first entry. Data starts by type "close" at "${weekday}"`,
      { weekday }
    );
  }

  public static CloseAfterClosedDay(weekday: weekday) {
    return new OpeningHoursParseError<{ weekday: weekday }>(
      OpeningHoursParseErrorCode.CLOSE_AFTER_CLOSED_DAY,
      `First entry after a closed day cannot by of type "close"! "${weekday}"`,
      { weekday }
    );
  }

  public static OpenBeforeClosedDay(weekday: weekday) {
    return new OpeningHoursParseError<{ weekday: weekday }>(
      OpeningHoursParseErrorCode.OPEN_BEFORE_CLOSED_DAY,
      `Last entry before a closed day cannot by of type "open"! "${weekday}"`,
      { weekday }
    );
  }

  public static TwoSameFollowingTypes(
    weekday: weekday,
    type: 'open' | 'close'
  ) {
    return new OpeningHoursParseError<{
      weekday: weekday;
      type: 'open' | 'close';
    }>(
      OpeningHoursParseErrorCode.TWO_SAME_FOLLOWING_TYPES,
      `Two following records of the same type "${type}" found! "${weekday}"`,
      { weekday, type }
    );
  }
}

export function getOpeningHoursInputFlatMap(
  input: IOpeningHoursInputSchema
): (key: weekday) => IIndexedOpeningHoursWeekdayEntry[] {
  return (key: weekday) => {
    const records = input[key];

    return records?.length > 0
      ? records
          // Sort weekday opn/close records as we expect that they should
          // follow increasingly time.
          .sort((a, b) => a.value - b.value)
          .map((record) => ({ ...record, weekdayIndex: weekdayToIndex(key) }))
      : [{ weekdayIndex: weekdayToIndex(key) }];
  };
}
/**
 * First entry has to be either of undefined type (that day is closed) or 'open'
 */
export function assertFirstOpeningHoursEntry(
  entry: IIndexedOpeningHoursWeekdayEntry,
  ix: number
) {
  if (ix === 0 && entry.type === 'close') {
    throw OpeningHoursParseError.FirstEntryClosed(
      indexToWeekday(entry.weekdayIndex)
    );
  }
  return entry;
}
/**
 * Two following entries would be invalid in those cases:
 *  - first entry is of type 'close'
 *  - prev entry was a closed day and new entry is of type 'close',
 *    it would mean, that opening hours period would overlap more than one day.
 *  - prev entry was of type 'open' and the next day is closed all the day. (No
 *    opening hours), that would also extend the time range over more than one day.
 *  - two records of the same type follow each other.
 */
export function assertOpeningHourEntries(
  entry: IIndexedOpeningHoursWeekdayEntry,
  ix: number,
  list: IIndexedOpeningHoursWeekdayEntry[]
) {
  if (ix === 0 && entry.type === 'close') {
    throw OpeningHoursParseError.FirstEntryClosed(
      indexToWeekday(entry.weekdayIndex)
    );
  }

  const prevEntry = list[ix - 1];

  if (prevEntry && !prevEntry.type && entry.type === 'close') {
    throw OpeningHoursParseError.CloseAfterClosedDay(
      indexToWeekday(entry.weekdayIndex)
    );
  }

  if (prevEntry && !entry.type && prevEntry.type === 'open') {
    throw OpeningHoursParseError.OpenBeforeClosedDay(
      indexToWeekday(entry.weekdayIndex)
    );
  }

  if (prevEntry && prevEntry.type && prevEntry.type === entry.type) {
    throw OpeningHoursParseError.TwoSameFollowingTypes(
      indexToWeekday(entry.weekdayIndex),
      entry.type
    );
  }
  return entry;
}

/**
 * Fix the entries weekday index. If an entry which is not the first is of type
 * 'close' but is the first for it`s weekday, let`s just decrease the weekday
 * index by one, because it means that such entry is a closing time for the
 * previous day, which overlaps over midnight.
 */
export function fixOpeningHoursWeekdayIndex(
  entry: IIndexedOpeningHoursWeekdayEntry,
  ix: number,
  list: IIndexedOpeningHoursWeekdayEntry[]
) {
  const prevEntry = list[ix - 1];
  const nextEntry = list[ix + 1];
  const currentWeekdayIndex = entry.weekdayIndex;
  if (
    prevEntry &&
    prevEntry.weekdayIndex !== currentWeekdayIndex &&
    entry.type === 'close'
  ) {
    entry.weekdayIndex = prevEntry.weekdayIndex;
    // We need to create a fake entry for a weekday, which would close after
    // midnight and not reopen during the day.
    if (!nextEntry || nextEntry.weekdayIndex !== currentWeekdayIndex) {
      return [entry, { weekdayIndex: currentWeekdayIndex }];
    }
    return [entry];
  } else {
    return [entry];
  }
}

export function formatOpeningHoursData(
  buckets: IOpeningHoursData[],
  entry: IIndexedOpeningHoursWeekdayEntry,
  ix: number,
  list: IIndexedOpeningHoursWeekdayEntry[]
): IOpeningHoursData[] {
  const prevEntry = list[ix - 1];
  if (
    prevEntry &&
    prevEntry.weekdayIndex === entry.weekdayIndex &&
    entry.type
  ) {
    const lastBucket = buckets[buckets.length - 1];
    if (entry.type === 'open') {
      lastBucket.entries.push({
        openAtSeconds: Number(entry.value),
        closeAtSeconds: NaN,
      });
    } else if (entry.type === 'close') {
      lastBucket.entries[lastBucket.entries.length - 1].closeAtSeconds = Number(
        entry.value
      );
    }
  } else {
    buckets.push({
      weekdayIndex: entry.weekdayIndex,
      entries:
        entry.type === 'open'
          ? [{ openAtSeconds: Number(entry.value), closeAtSeconds: NaN }]
          : [],
    });
  }
  return buckets;
}

/**
 * @throws {OpeningHoursParseError}
 */
export function parseOpeningHoursSource(
  input: IOpeningHoursInputSchema
): IOpeningHoursData[] {
  return (
    Reflect.ownKeys(input)
      // Skip all invalid entries, keep only weekdays
      .filter(isWeekday)
      // Sort all weekdays into correct order. Even if the source file
      // kept weekday records in correct order, there is no guarantee, that
      // a validator function respected that order.
      .sort(compareWeekdaysAsc)
      // Flatten all weekday records. Each entry will now keep an index of
      // its weekday. (The index is more practial, because it can be used with
      // native intl API, and can be used to ensure order). The flat structure
      // will be eaisier for handling use case of open one day and closing
      // after midnight.
      .flatMap(getOpeningHoursInputFlatMap(input))
      // Make sure that there are no illegal entry type sequence combinations.
      .map(assertOpeningHourEntries)
      // Fix opening hours overlaping over midnight.
      .flatMap(fixOpeningHoursWeekdayIndex)
      // Transform a flat entries structure into array buckets per weekday with
      // more ui friendly formatting of opneing hours data
      .reduce<IOpeningHoursData[]>(formatOpeningHoursData, [])
  );
}
