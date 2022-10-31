import { defineMessage } from 'react-intl';
import { OpeningHoursParseErrorCode } from './helpers';

export const OPENING_HOURS_PARSER_MESSAGES = {
  [OpeningHoursParseErrorCode.FIRST_ENTRY_CLOSED]: defineMessage({
    defaultMessage:
      'Invalid first entry. Data cannot start with type "closed". ({weekday})',
  }),
  [OpeningHoursParseErrorCode.CLOSE_AFTER_CLOSED_DAY]: defineMessage({
    defaultMessage:
      'First entry after a closed day cannot by of type "close"!. ({weekday})',
  }),
  [OpeningHoursParseErrorCode.OPEN_BEFORE_CLOSED_DAY]: defineMessage({
    defaultMessage:
      'Last entry before a closed day cannot by of type "open"!. ({weekday})',
  }),
  [OpeningHoursParseErrorCode.TWO_SAME_FOLLOWING_TYPES]: defineMessage({
    defaultMessage:
      'Two following records of the same type "{type}" found! "({weekday})"',
  }),

  unknownParseError: defineMessage({
    defaultMessage: 'Unknown parse error!',
  }),
};
