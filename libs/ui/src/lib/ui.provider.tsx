import { CssBaseline, ThemeProvider } from '@mui/material';
import * as React from 'react';
import { lightTheme } from './themes';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export interface IWoltUiProviderProps extends React.PropsWithChildren {}

export type WoltUiProviderComponent = React.FC<IWoltUiProviderProps>;

export const WoltUiProvider: WoltUiProviderComponent = (props) => {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  );
};

WoltUiProvider.displayName = 'WoltUiProvider';

WoltUiProvider.defaultProps = {};
