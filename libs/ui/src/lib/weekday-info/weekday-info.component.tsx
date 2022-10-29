import * as React from 'react';
import Box from '@mui/material/Box';
import { OpeningHoursRange } from '../opening-hours-range/opening-hours-range.component';
import { WeekdayLabel } from '../weekday-label/weekday-label.component';
import { TodayLabel } from '../today-label/today-label.component';
import { ClosedLabel } from '../closed-label/closed-label.component';

export interface IOpenningHoursData {
  openAtSeconds: number;
  closeAtSeconds: number;
}

export interface IWeekdayInfoProps {
  data?: IOpenningHoursData[];
  dayOfWeek: number;
}

export type WeekdayInfoComponent = React.FC<IWeekdayInfoProps>;

export const WeekdayInfo: WeekdayInfoComponent = (props) => {
  const isToday = React.useMemo(
    () => new Date().getDay() - 1 === props.dayOfWeek,
    [props.dayOfWeek]
  );
  console.log(
    props.data,
    props.data?.length,
    props.data?.length && props.data.length > 0
  );
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', height: '100%' }}>
      <WeekdayLabel day={props.dayOfWeek} />
      {isToday && <TodayLabel />}
      <Box sx={{ flex: 1, lineHeight: '38px' }}>
        {!props.data?.length && <ClosedLabel textAlign="right" />}
        {props.data &&
          props.data.length > 0 &&
          props.data?.map((record, ix) => (
            <Box sx={{ textAlign: 'right', lineHeight: '38px' }}>
              <OpeningHoursRange
                key={ix}
                startAtSeconds={record.openAtSeconds}
                endAtSeconds={record.closeAtSeconds}
              />
            </Box>
          ))}
      </Box>
    </Box>
  );
};

WeekdayInfo.displayName = 'WeekdayInfo';

WeekdayInfo.defaultProps = {};
