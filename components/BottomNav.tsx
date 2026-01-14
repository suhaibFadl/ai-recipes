'use client'

import { BottomNavigation, BottomNavigationAction, Paper, Fab, Box } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import DinnerDiningIcon from '@mui/icons-material/DinnerDining'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import SettingsIcon from '@mui/icons-material/Settings'

interface BottomNavProps {
  value: string
  onChange: (newValue: string) => void
  show?: boolean
}

export default function BottomNav({ value, onChange, show = true }: BottomNavProps) {
  if (!show) return null

  const isCameraSelected = value === 'image-to-description'

  return (
    <Paper 
      sx={{ 
        position: 'absolute', 
        bottom: 0, 
        left: 0, 
        right: 0,
        zIndex: 1000,
        borderTop: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.default',
        pt: 0.5,
        pb: 0.5
      }} 
      elevation={3}
    >
      <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 0.5 }}>
        {/* Special Camera Button in Center */}
        <Fab
          onClick={() => onChange('image-to-description')}
          sx={{
            position: 'absolute',
            top: -20,
            width: 56,
            height: 56,
            backgroundColor: isCameraSelected ? 'tertiary.main' : 'tertiary.main',
            color: isCameraSelected ? '#1C1B1F' : '#1C1B1F',
            boxShadow: isCameraSelected 
              ? '0 6px 12px rgba(255, 209, 34, 0.4)' 
              : '0 4px 8px rgba(255, 209, 34, 0.3)',
            border: '2px solid',
            borderColor: isCameraSelected ? 'primary.main' : 'tertiary.dark',
            zIndex: 1001,
            '&:hover': {
              backgroundColor: 'tertiary.light',
              boxShadow: '0 6px 16px rgba(255, 209, 34, 0.5)',
              transform: 'scale(1.05)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          <CameraAltIcon sx={{ fontSize: 28 }} />
        </Fab>
      </Box>

      <BottomNavigation
        value={value}
        onChange={(_, newValue) => {
          if (newValue !== 'image-to-description') {
            onChange(newValue)
          }
        }}
        showLabels
        sx={{
          backgroundColor: 'transparent',
          height: 56,
          '& .MuiBottomNavigationAction-root': {
            color: 'text.secondary',
            minWidth: '60px',
            paddingTop: 0,
            paddingBottom: 0,
            '&.Mui-selected': {
              color: 'primary.main',
            },
          },
        }}
      >
        <BottomNavigationAction
          label="Home"
          value="home"
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          label="Recipes"
          value="recipes"
          icon={<DinnerDiningIcon />}
        />
        <BottomNavigationAction
          label=""
          value="image-to-description"
          icon={<Box />}
          sx={{ minWidth: 0, maxWidth: 64, pointerEvents: 'none' }}
        />
        <BottomNavigationAction
          label="Schedule"
          value="meal-schedule"
          icon={<CalendarTodayIcon />}
        />
        <BottomNavigationAction
          label="Settings"
          value="settings"
          icon={<SettingsIcon />}
        />
      </BottomNavigation>
    </Paper>
  )
}
