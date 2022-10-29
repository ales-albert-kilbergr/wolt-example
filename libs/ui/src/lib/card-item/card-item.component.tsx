import * as React from 'react';
import CardContent from '@mui/material/CardContent';

export type CardItemComponent = React.FC<React.PropsWithChildren>;

export const CardItem: CardItemComponent = (props) => {
  return (
    <CardContent
      sx={{
        borderBottom: '2px solid #eeeeee',
      }}
    >
      {props.children}
    </CardContent>
  );
};

CardItem.displayName = 'CardItem';

CardItem.defaultProps = {};
