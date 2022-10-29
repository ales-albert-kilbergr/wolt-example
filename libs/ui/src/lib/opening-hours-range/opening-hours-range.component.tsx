import * as React from 'react';
import { TimeLabel } from '../time-label/time-label.component';
import Typography from '@mui/material/Typography';

export interface IOpeningHoursRangeProps {
  startAtSeconds: number;
  endAtSeconds: number;
}

export type OpeningHoursRangeComponent = React.FC<IOpeningHoursRangeProps>;

export const OpeningHoursRange: OpeningHoursRangeComponent = (props) => {
  return (
    <Typography sx={{ lineHeight: '38px' }}>
      <TimeLabel seconds={props.startAtSeconds} />
      {' - '}
      <TimeLabel seconds={props.endAtSeconds} />
    </Typography>
  );
};

OpeningHoursRange.displayName = 'OpeningHoursRange';

OpeningHoursRange.defaultProps = {};
