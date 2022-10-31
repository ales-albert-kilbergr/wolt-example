import * as React from 'react';
import Typography from '@mui/material/Typography';
import { SxProps } from '@mui/material';

export interface ISecondaryLinkProps extends React.PropsWithChildren {
  active?: boolean;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  sx?: SxProps;
}

export type SecondaryLinkComponent = React.FC<ISecondaryLinkProps>;

export const SecondaryLink: SecondaryLinkComponent = ({
  active,
  disabled,
  sx,
  ...props
}) => {
  return (
    <Typography
      {...props}
      sx={{
        display: 'inline-block',
        color: 'woltGrey.600',
        cursor: disabled ? 'initial' : 'pointer',
        borderBottom: `2px solid`,
        borderColor: active ? 'woltGrey.600' : 'transparent',
        transition: 'border-color 0.25s ease-in-out',
        '&:hover': {
          borderColor: disabled ? 'transparent' : 'woltGrey.600',
        },
        ...sx,
      }}
    >
      {props.children}
    </Typography>
  );
};

SecondaryLink.displayName = 'SecondaryLink';

SecondaryLink.defaultProps = {};
