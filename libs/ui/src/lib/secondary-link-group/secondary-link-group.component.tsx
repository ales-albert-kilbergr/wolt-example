import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export interface ISecondaryLinkGroupProps extends React.PropsWithChildren {
  separator?: JSX.Element | string;
}

export type SecondaryLinkGroupComponent = React.FC<ISecondaryLinkGroupProps>;

export const SecondaryLinkGroup: SecondaryLinkGroupComponent = (props) => {
  return (
    <Box sx={{ display: 'flex', columnGap: '6px' }}>
      {React.Children.map(props.children, (child, ix) => (
        <>
          {ix > 0 ? <Typography>{props.separator}</Typography> : null}
          {child}
        </>
      ))}
    </Box>
  );
};

SecondaryLinkGroup.displayName = 'SecondaryLinkGroup';

SecondaryLinkGroup.defaultProps = {
  separator: '|',
};
