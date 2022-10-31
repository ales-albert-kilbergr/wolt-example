import { WOLT_UI_MESSAGES } from '@wolt/ui';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { OpeningHoursParseError } from '../../helpers';
import { OPENING_HOURS_PARSER_MESSAGES } from '../../messages';

export interface IOpeningHoursParseErrorMessageProps {
  error?: OpeningHoursParseError | unknown | null;
}

export type OpeningHoursParseErrorMessageComponent =
  React.FC<IOpeningHoursParseErrorMessageProps>;

export const OpeningHoursParseErrorMessage: OpeningHoursParseErrorMessageComponent =
  (props) => {
    if (props.error instanceof OpeningHoursParseError) {
      return (
        <FormattedMessage
          {...OPENING_HOURS_PARSER_MESSAGES[props.error.code]}
          values={props.error.params}
        />
      );
    } else {
      return (
        <FormattedMessage
          {...OPENING_HOURS_PARSER_MESSAGES.unknownParseError}
        />
      );
    }
  };

OpeningHoursParseErrorMessage.displayName = 'OpeningHoursParseErrorMessage';

OpeningHoursParseErrorMessage.defaultProps = {};
