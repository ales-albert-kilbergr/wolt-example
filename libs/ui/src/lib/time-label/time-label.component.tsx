import * as React from 'react';
import { FormattedTimeParts } from 'react-intl';

export interface ITimeLabelProps {
  seconds: number;
}

export type TimeLabelComponent = React.FC<ITimeLabelProps>;

export const TimeLabel: TimeLabelComponent = (props) => {
  const timeDate = React.useMemo(
    // Convert to milliseconds
    () => new Date(props.seconds * 1000),
    [props.seconds]
  );
  return (
    <FormattedTimeParts value={timeDate}>
      {(parts) => (
        <span>
          {parts[0].value}
          {/*
           * PM|AM only exists if locale is en-US, in other european locales
           * this time part does not exists as the 0-24 format is used.
           */}
          {parts[4]?.value ? ` ${parts[4].value}` : ':00'}
        </span>
      )}
    </FormattedTimeParts>
  );
};

TimeLabel.displayName = 'TimeLabel';

TimeLabel.defaultProps = {};
