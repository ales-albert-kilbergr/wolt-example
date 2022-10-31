import * as React from 'react';
import Box from '@mui/material/Box';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

export type CardHeaderComponent = React.FC<React.PropsWithChildren>;

export const CardHeader: CardHeaderComponent = (props) => {
  return (
    <CardContent
      sx={{
        display: 'flex',
        borderBottom: (theme) => `2px solid ${theme.palette.woltGrey['600']}`,
        columnGap: '12px',
        alignItems: 'center',
        lineHeight: '48px',
        padding: '32px 0 12px 0',
        height: 'auto',
      }}
    >
      <AccessTimeIcon color="disabled" sx={{ width: '24px' }} />
      <Typography variant="h3">{props.children}</Typography>
    </CardContent>
  );
};

CardHeader.displayName = 'CardHeader';

CardHeader.defaultProps = {};
