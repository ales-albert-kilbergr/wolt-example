import * as React from 'react';

export interface ICardHeaderProps {}

export type CardHeaderComponent = React.FC<ICardHeaderProps>;

export const CardHeader: CardHeaderComponent = (props) => {
  return <div>My component: CardHeader</div>;
};

CardHeader.displayName = 'CardHeader';

CardHeader.defaultProps = {};
