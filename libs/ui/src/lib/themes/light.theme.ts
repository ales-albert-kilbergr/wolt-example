import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  typography: {
    fontFamily: 'Roboto',
    allVariants: {
      color: '#202125',
    },
    h3: {
      fontSize: '24px',
      fontWeight: '900',
    },
    h4: {
      fontSize: '18px',
      fontWeight: '600',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        body: {
          background: '#f8f8f8',
        },
      }),
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0px 2px 3px 1px #8888882b',
          width: '350px',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '0',
          minHeight: '38px',
          margin: '0 32px 0 32px',
          '&:last-child': {
            padding: '0',
            marginBottom: '32px',
          },
        },
      },
    },
  },
});
