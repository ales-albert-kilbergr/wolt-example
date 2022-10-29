import { Typography } from '@mui/material';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { WOLT_UI_MESSAGES } from '../ui.messages';

export type TodayLabelComponent = React.FC;

/**
 *
 */
export const TodayLabel: TodayLabelComponent = () => {
  return (
    <Typography
      variant="body1"
      sx={{
        textTransform: 'uppercase',
        fontWeight: '600',
        fontSize: '14px',
        color: '#5BCB02',
        paddingLeft: '12px',
        lineHeight: '38px',
      }}
    >
      <FormattedMessage {...WOLT_UI_MESSAGES.today} />
    </Typography>
  );
};

TodayLabel.displayName = 'TodayLabel';

TodayLabel.defaultProps = {};
