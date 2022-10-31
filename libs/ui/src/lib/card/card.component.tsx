import * as React from 'react';
import Card from '@mui/material/Card';

export type WoltCardComponent = React.FC<React.PropsWithChildren>;

export const WoltCard: WoltCardComponent = (props) => {
  return <Card>{props.children}</Card>;
};

WoltCard.displayName = 'WoltCard';

WoltCard.defaultProps = {};
