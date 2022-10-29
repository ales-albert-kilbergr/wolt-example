import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

export type WoltCardComponent = React.FC<React.PropsWithChildren>;

export const WoltCard: WoltCardComponent = (props) => {
  return (
    <Card
      sx={
        {
          // background: '#ffffff',
          // borderRadius: '12px',
          // boxShadow: '0px 2px 3px 1px #8888882b;',
          /// width: '350px',
        }
      }
    >
      {props.children}
    </Card>
  );
};

WoltCard.displayName = 'WoltCard';

WoltCard.defaultProps = {};
