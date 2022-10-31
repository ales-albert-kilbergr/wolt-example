import {
  getOpeningHoursInputFlatMap,
  parseOpeningHoursSource,
  fixOpeningHoursWeekdayIndex,
  IIndexedOpeningHoursWeekdayEntry,
  OpeningHoursParseErrorCode,
} from './parse.helper';
import { weekdayToIndex } from './weekday.helper';

describe('getOpeningHoursInputFlatMap', () => {
  it('should flatten simple entry', () => {
    const testData = {
      saturday: [
        { type: 'open', value: 3600 },
        { type: 'close', value: 36000 },
      ],
    } as any;

    const result = getOpeningHoursInputFlatMap(testData)('saturday');

    expect(result).toHaveLength(2);
    expect(result[0].weekdayIndex).toBe(weekdayToIndex('saturday'));
    expect(result[1].weekdayIndex).toBe(weekdayToIndex('saturday'));
  });

  it('should sort correctly the tested inputs', () => {
    const testData = {
      saturday: [
        { type: 'close', value: 36000 },
        { type: 'open', value: 3600 },
      ],
    } as any;

    const result = getOpeningHoursInputFlatMap(testData)('saturday');

    expect(result).toHaveLength(2);
    expect(result[0].type).toBe('open');
    expect(result[1].type).toBe('close');
  });

  it('should return only one record', () => {
    const testData = {
      saturday: [],
    } as any;

    const result = getOpeningHoursInputFlatMap(testData)('saturday');

    expect(result).toHaveLength(1);
    expect(result[0].weekdayIndex).toBe(weekdayToIndex('saturday'));
    expect(result[0].type).toBeUndefined();
  });
});

describe('fixOpeningHoursWeekdayIndex', () => {
  it('should add a fake entry for a day afer midnight', () => {
    const testData: IIndexedOpeningHoursWeekdayEntry[] = [
      { weekdayIndex: 0, type: 'open', value: 54000 },
      { weekdayIndex: 1, type: 'close', value: 3600 },
      { weekdayIndex: 2, type: 'open', value: 3600 },
      { weekdayIndex: 2, type: 'close', value: 36000 },
    ];

    const result = fixOpeningHoursWeekdayIndex(testData[1], 1, testData);

    expect(result).toHaveLength(2);
    expect(result[0].weekdayIndex).toBe(0);
    expect(result[1].weekdayIndex).toBe(1);
    expect(result[1].type).toBeUndefined();
  });

  it('should add a fake entry for one day afer midnight on the end of a list', () => {
    const testData: IIndexedOpeningHoursWeekdayEntry[] = [
      { weekdayIndex: 0, type: 'open', value: 54000 },
      { weekdayIndex: 1, type: 'close', value: 3600 },
    ];

    const result = fixOpeningHoursWeekdayIndex(testData[1], 1, testData);

    expect(result).toHaveLength(2);
    expect(result[0].weekdayIndex).toBe(0);
    expect(result[1].weekdayIndex).toBe(1);
    expect(result[1].type).toBeUndefined();
  });
});

describe('parseOpeningHoursSource', () => {
  it('shoulds parse correctly simple input', () => {
    const testData = {
      saturday: [
        { type: 'open', value: 3600 },
        { type: 'close', value: 36000 },
      ],
    };
    const parsedResult = parseOpeningHoursSource(testData as any);

    expect(parsedResult).toHaveLength(1);
    expect(parsedResult[0].weekdayIndex).toBe(weekdayToIndex('saturday'));
    expect(parsedResult[0].entries).toHaveLength(1);
    expect(parsedResult[0].entries[0].closeAtSeconds).toBe(36000);
    expect(parsedResult[0].entries[0].openAtSeconds).toBe(3600);
  });

  it('should parse correctly with an empty first day', () => {
    const testData = {
      monday: [],
      saturday: [
        { type: 'open', value: 3600 },
        { type: 'close', value: 36000 },
      ],
    };
    const parsedResult = parseOpeningHoursSource(testData as any);

    expect(parsedResult).toHaveLength(2);
    expect(parsedResult[0].weekdayIndex).toBe(weekdayToIndex('monday'));
    expect(parsedResult[0].entries).toHaveLength(0);
    expect(parsedResult[1].weekdayIndex).toBe(weekdayToIndex('saturday'));
    expect(parsedResult[1].entries).toHaveLength(1);
    expect(parsedResult[1].entries[0].closeAtSeconds).toBe(36000);
    expect(parsedResult[1].entries[0].openAtSeconds).toBe(3600);
  });

  it('should parse correctly with multiple empty days', () => {
    const testData = {
      monday: [],
      tuesday: [
        { type: 'open', value: 3600 },
        { type: 'close', value: 36000 },
      ],
      wednesday: [],
      thursday: [
        { type: 'open', value: 3600 },
        { type: 'close', value: 36000 },
      ],
    };
    const parsedResult = parseOpeningHoursSource(testData as any);

    expect(parsedResult).toHaveLength(4);
    expect(parsedResult[0].weekdayIndex).toBe(weekdayToIndex('monday'));
    expect(parsedResult[0].entries).toHaveLength(0);
    expect(parsedResult[1].weekdayIndex).toBe(weekdayToIndex('tuesday'));
    expect(parsedResult[1].entries).toHaveLength(1);
    expect(parsedResult[2].weekdayIndex).toBe(weekdayToIndex('wednesday'));
    expect(parsedResult[2].entries).toHaveLength(0);
    expect(parsedResult[3].weekdayIndex).toBe(weekdayToIndex('thursday'));
    expect(parsedResult[3].entries).toHaveLength(1);
  });

  it('should parse correctly with data over midnight', () => {
    const testData = {
      monday: [
        { type: 'open', value: 3600 },
        { type: 'close', value: 36000 },
        { type: 'open', value: 54000 },
      ],
      tuesday: [{ type: 'close', value: 3600 }],
    };
    const parsedResult = parseOpeningHoursSource(testData as any);

    expect(parsedResult).toHaveLength(2);
    expect(parsedResult[0].weekdayIndex).toBe(weekdayToIndex('monday'));
    expect(parsedResult[0].entries).toHaveLength(2);
    expect(parsedResult[1].weekdayIndex).toBe(weekdayToIndex('tuesday'));
    expect(parsedResult[1].entries).toHaveLength(0);
  });

  it('should throw a parse error: FIRST_ENTRY_CLOSED', () => {
    const testData = {
      monday: [
        { type: 'close', value: 3600 },
        { type: 'open', value: 54000 },
      ],
      tuesday: [{ type: 'close', value: 3600 }],
    };
    expect(() => parseOpeningHoursSource(testData as any)).toThrow(
      expect.objectContaining({
        code: OpeningHoursParseErrorCode.FIRST_ENTRY_CLOSED,
      })
    );
  });

  it('should throw a parse error: CLOSE_AFTER_CLOSED_DAY', () => {
    const testData = {
      monday: [],
      tuesday: [
        { type: 'close', value: 3600 },
        { type: 'open', value: 54000 },
      ],
    };
    expect(() => parseOpeningHoursSource(testData as any)).toThrow(
      expect.objectContaining({
        code: OpeningHoursParseErrorCode.CLOSE_AFTER_CLOSED_DAY,
      })
    );
  });

  it('should throw a parse error: OPEN_BEFORE_CLOSED_DAY', () => {
    const testData = {
      monday: [{ type: 'open', value: 54000 }],
      tuesday: [],
    };
    expect(() => parseOpeningHoursSource(testData as any)).toThrow(
      expect.objectContaining({
        code: OpeningHoursParseErrorCode.OPEN_BEFORE_CLOSED_DAY,
      })
    );
  });

  it('should throw a parse error: TWO_SAME_FOLLOWING_TYPES', () => {
    const testData = {
      monday: [
        { type: 'open', value: 36000 },
        { type: 'open', value: 54000 },
      ],
    };
    expect(() => parseOpeningHoursSource(testData as any)).toThrow(
      expect.objectContaining({
        code: OpeningHoursParseErrorCode.TWO_SAME_FOLLOWING_TYPES,
      })
    );
  });
});
