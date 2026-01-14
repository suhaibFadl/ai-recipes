'use client'

import { AppBar as MuiAppBar, Toolbar, IconButton, Typography, Box } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { ReactNode } from 'react'

interface AppBarProps {
  title: string
  onBack?: () => void
  showBack?: boolean
  rightAction?: ReactNode
}

export default function AppBar({ title, onBack, showBack = false, rightAction }: AppBarProps) {
  return (
    <MuiAppBar 
      position="sticky" 
      elevation={0}
      sx={{
        backgroundColor: 'background.default',
        color: 'text.primary',
      }}
    >
      <Toolbar sx={{ justifyContent: 'center' }}>
        {showBack && onBack && (
          <IconButton
            edge="start"
            color="inherit"
            onClick={onBack}
            sx={{ 
              mr: 2,
              position: 'absolute',
              left: 8
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        )}
        <Typography variant="h5" component="div" sx={{ fontWeight: 600, textAlign: 'center' }}>
          {title}
        </Typography>
        {rightAction && (
          <Box sx={{ position: 'absolute', right: 8 }}>
            {rightAction}
          </Box>
        )}
      </Toolbar>
    </MuiAppBar>
  )
}
