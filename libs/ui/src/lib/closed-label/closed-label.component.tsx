import { Typography } from '@mui/material';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { WOLT_UI_MESSAGES } from '../ui.messages';

export type ClosedLabelComponent = React.FC<ClosedLabelProps>;

export interface ClosedLabelProps {
  textAlign?: 'left' | 'right' | 'center';
}

/**
 *
 */
export const ClosedLabel: ClosedLabelComponent = (props) => {
  return (
    <Typography
      variant="body1"
      sx={{
        textTransform: 'capitalize',
        fontWeight: '400',
        flex: '1',
        textAlign: props.textAlign,
        fontSize: '16px',
        color: '#A1A2A3',
        lineHeight: '38px',
      }}
    >
      <FormattedMessage {...WOLT_UI_MESSAGES.closed} />
    </Typography>
  );
};

ClosedLabel.displayName = 'ClosedLabel';

ClosedLabel.defaultProps = {};
