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
        color: '#A1A2A4',
        cursor: disabled ? 'initial' : 'pointer',
        borderBottom: `2px solid ${active ? '#A1A2A4' : 'transparent'}`,
        transition: 'border-color 0.25s ease-in-out',
        '&:hover': {
          borderColor: disabled ? 'transparent' : '#A1A2A4',
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
