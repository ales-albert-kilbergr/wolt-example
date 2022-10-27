import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        body: {
          background: 'red',
        },
      }),
    },
  },
});
