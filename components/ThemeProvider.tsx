'use client'

import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider as AppThemeProvider, useTheme } from '@/contexts/ThemeContext'
import { createAppTheme } from '@/theme/theme'

function MuiThemeWrapper({ children }: { children: React.ReactNode }) {
  const { darkMode } = useTheme()
  const theme = createAppTheme(darkMode)

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  )
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <AppThemeProvider>
      <MuiThemeWrapper>
        {children}
      </MuiThemeWrapper>
    </AppThemeProvider>
  )
}
