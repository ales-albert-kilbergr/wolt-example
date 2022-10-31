import * as React from 'react';
import CardContent from '@mui/material/CardContent';

export type CardItemComponent = React.FC<React.PropsWithChildren>;

export const CardItem: CardItemComponent = (props) => {
  return (
    <CardContent
      sx={{
        borderBottom: (theme) => `2px solid ${theme.palette.woltGrey[400]}`,
      }}
    >
      {props.children}
    </CardContent>
  );
};

CardItem.displayName = 'CardItem';

CardItem.defaultProps = {};
