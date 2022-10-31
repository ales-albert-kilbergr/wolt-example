import { createTheme } from '@mui/material/styles';
import { ColorPartial } from '@mui/material/styles/createPalette';

declare module '@mui/material/styles' {
  interface Palette {
    woltBlack: Palette['primary'];
    woltWhite: Palette['primary'];
    woltGreen: Palette['primary'];
    woltGrey: ColorPartial;
  }
  interface PaletteOptions {
    woltBlack: PaletteOptions['primary'];
    woltWhite: PaletteOptions['primary'];
    woltGreen: PaletteOptions['primary'];
    woltGrey: PaletteOptions['primary'];
  }
}

export const lightTheme = createTheme({
  palette: {
    woltBlack: {
      main: '#202125',
    },
    woltWhite: {
      main: '#FFFFFF',
    },
    woltGreen: {
      main: '#5BCB02',
    },
    woltGrey: {
      '200': '#F8F8F8',
      '400': '#EEEEEE',
      '600': '#A1A2A4',
    },
  },
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
          background: theme.palette.woltGrey['200'],
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
