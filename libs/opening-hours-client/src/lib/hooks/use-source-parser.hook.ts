import * as React from 'react';
import {
  IOpeningHoursInputSchema,
  isWeekday,
  IWeekday,
} from './use-load-source-schema.hook';

export interface IOpeningHoursData {
  weekday: number;
  entries: IOpeningHoursEntry[];
}

export interface IOpeningHoursEntry {
  openAtSeconds: number;
  closeAtSeconds: number;
}

export interface IOpeningHoursSourceParser
  extends IOpeningHoursSourceParserState {
  parse: (input: IOpeningHoursInputSchema) => void;
  clear: () => void;
}

export interface IOpeningHoursSourceParserProps {}

export type IOpeningHoursSourceParserHook = (
  props: IOpeningHoursSourceParserProps
) => IOpeningHoursSourceParser;

interface IOpeningHoursSourceParserState {
  data?: IOpeningHoursData[] | null;
  error?: unknown | null;
}

interface IOpeningHoursSourceParserDataAction {
  type: 'data';
  data: IOpeningHoursData[] | null;
}

interface IOpeningHoursSourceParserErrorAction {
  type: 'error';
  error?: unknown | null;
}

export type IOpeningHoursSourceParserReducer = React.Reducer<
  IOpeningHoursSourceParserState,
  IOpeningHoursSourceParserDataAction | IOpeningHoursSourceParserErrorAction
>;

const openingHoursSourceParserReducer: IOpeningHoursSourceParserReducer = (
  prevState,
  action
) => {
  switch (action.type) {
    case 'data':
      return { ...prevState, error: null, data: action.data };
    case 'error':
      return { ...prevState, error: action.error, data: null };
    default:
      return prevState;
  }
};

function parse(input: IOpeningHoursInputSchema): IOpeningHoursData[] {
  return (
    Reflect.ownKeys(input)
      // Skip all invalid entries
      .filter((key) => isWeekday(key))
      // Flatten all entries records
      .flatMap((key: any) =>
        Reflect.get(input, key)
          .sort((a: any, b: any) => a.value - b.value)
          .map((entry: any) => ({
            ...entry,
            weekday: weekdayToIndex(key),
          }))
      )
      .map((entry, ix, list) => {
        const prevEntry = list[ix - 1];
        if (entry.type === 'close' && !prevEntry) {
          throw new Error('First entry cannot be closed!');
        }
        if (prevEntry && entry.type === prevEntry.type) {
          throw new Error(
            `Two same entry types cannot follow each other "${entry.type}"`
          );
        }
        if (entry.type === 'close' && entry.weekday !== prevEntry.weekday) {
          entry.weekday = prevEntry.weekday;
        }

        return entry;
      })
      //Create open - close buckets
      .reduce(
        (buckets, entry) => {
          const lastBucket = buckets[buckets.length - 1];
          if (lastBucket.length < 2) {
            lastBucket.push(entry);
          } else {
            buckets.push([entry]);
          }
          return buckets;
        },
        [[]]
      )
      .reduce((sum: any, bucket: any) => {
        const weekday = bucket[0].weekday;
        const record = sum[weekday] || {
          weekday: weekday,
          entries: [],
        };
        record.entries.push({
          openAtSeconds: bucket[0].value,
          closeAtSeconds: bucket[1].value,
        });

        sum[weekday] = record;

        return sum;
      }, [])
      .filter(Boolean)
  );
}

function weekdayToIndex(weekday: string): number {
  switch (weekday.toLowerCase()) {
    case 'monday':
      return 0;
    case 'tuesday':
      return 1;
    case 'wednesday':
      return 2;
    case 'thursday':
      return 3;
    case 'friday':
      return 4;
    case 'saturday':
      return 5;
    case 'sunday':
      return 6;
    default:
      return -1;
  }
}

export const useOpeningHoursSourceParser: IOpeningHoursSourceParserHook =
  () => {
    const [state, dispatch] =
      React.useReducer<IOpeningHoursSourceParserReducer>(
        openingHoursSourceParserReducer,
        {}
      );

    const parseClb = React.useCallback((input: IOpeningHoursInputSchema) => {
      try {
        const data = parse(input);
        dispatch({ type: 'data', data });
      } catch (error) {
        dispatch({ type: 'error', error });
      }
    }, []);

    const clearClb = React.useCallback(() => {
      dispatch({ type: 'data', data: null });
    }, []);

    return React.useMemo(
      () => ({ parse: parseClb, clear: clearClb, ...state }),
      [parseClb, state, clearClb]
    );
  };
