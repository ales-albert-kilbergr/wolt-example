import { Typography } from '@mui/material';
import * as React from 'react';
import { useIntl } from 'react-intl';

export interface IWeekdayLabelProps {
  day: number;
  format?: 'short' | 'long';
}

export type WeekdayLabelComponent = React.FC<IWeekdayLabelProps>;

export const WeekdayLabel: WeekdayLabelComponent = (props) => {
  const intl = useIntl();
  const intlShape = Intl.DateTimeFormat([intl.locale], {
    weekday: props.format,
  });

  const label = intlShape.format(new Date(Date.UTC(2021, 5, props.day)));

  return (
    <Typography variant="h4" sx={{ lineHeight: '38px' }}>
      {label}
    </Typography>
  );
};

WeekdayLabel.displayName = 'WeekdayLabel';

WeekdayLabel.defaultProps = {
  format: 'long',
};
