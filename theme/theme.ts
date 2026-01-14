'use client'

import { createTheme, Theme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Palette {
    tertiary: Palette['primary']
    surface: {
      main: string
      variant: string
    }
  }
  interface PaletteOptions {
    tertiary?: PaletteOptions['primary']
    surface?: {
      main?: string
      variant?: string
    }
  }
}

export const createAppTheme = (darkMode: boolean): Theme => createTheme({
  palette: {
    mode: darkMode ? 'dark' : 'light',
    primary: {
      main: '#F10100',
      light: '#FF4A49',
      dark: '#B80000',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#476E00',
      light: '#6A9F1A',
      dark: '#2F4A00',
      contrastText: '#FFFFFF',
    },
    tertiary: {
      main: '#FFD122',
      light: '#FFDD55',
      dark: '#CC9E00',
      contrastText: darkMode ? '#FFFFFF' : '#1C1B1F',
    },
    error: {
      main: '#F10100',
      light: '#FF4A49',
      dark: '#B80000',
    },
    background: {
      default: darkMode ? '#121212' : '#FDFBF8',
      paper: darkMode ? '#1E1E1E' : '#FFFFFF',
    },
    text: {
      primary: darkMode ? '#FFFFFF' : '#1C1B1F',
      secondary: darkMode ? '#B0B0B0' : '#49454F',
    },
    surface: {
      main: darkMode ? '#1E1E1E' : '#FFFFFF',
      variant: darkMode ? '#2D2D2D' : '#D8D86B',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '32px',
      fontWeight: 400,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '28px',
      fontWeight: 400,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: '24px',
      fontWeight: 400,
      lineHeight: 1.2,
    },
    body1: {
      fontSize: '16px',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '14px',
      lineHeight: 1.5,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '20px',
          padding: '10px 24px',
          fontWeight: 500,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24)',
        },
      },
    },
  },
})

// Legacy export for backward compatibility
export const theme = createAppTheme(false)