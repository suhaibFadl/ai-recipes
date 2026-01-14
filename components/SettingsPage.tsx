'use client'

import { useState } from 'react'
import { Box, Container, Typography, Card, CardContent, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Switch, ListItemSecondaryAction } from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications'
import LanguageIcon from '@mui/icons-material/Language'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import HelpIcon from '@mui/icons-material/Help'
import LogoutIcon from '@mui/icons-material/Logout'
import SettingsIcon from '@mui/icons-material/Settings'
import AppBar from './AppBar'
import BottomNav from './BottomNav'
import { useTheme } from '@/contexts/ThemeContext'

interface SettingsPageProps {
  onBack: () => void
  currentNav?: string
  onNavChange?: (value: string) => void
}

export default function SettingsPage({ onBack, currentNav = 'settings', onNavChange }: SettingsPageProps) {
  const [notifications, setNotifications] = useState(true)
  const { darkMode, toggleDarkMode } = useTheme()

  const settingsItems = [
    {
      id: 'account',
      icon: <AccountCircleIcon />,
      title: 'Account',
      description: 'Manage your account settings',
      onClick: () => {}
    },
    {
      id: 'notifications',
      icon: <NotificationsIcon />,
      title: 'Notifications',
      description: 'Manage notification preferences',
      hasSwitch: true,
      switchValue: notifications,
      onSwitchChange: setNotifications
    },
    {
      id: 'language',
      icon: <LanguageIcon />,
      title: 'Language',
      description: 'English',
      onClick: () => {}
    },
    {
      id: 'dark-mode',
      icon: <DarkModeIcon />,
      title: 'Dark Mode',
      description: 'Toggle dark theme',
      hasSwitch: true,
      switchValue: darkMode,
      onSwitchChange: toggleDarkMode
    },
    {
      id: 'help',
      icon: <HelpIcon />,
      title: 'Help & Support',
      description: 'Get help and contact support',
      onClick: () => {}
    },
    {
      id: 'logout',
      icon: <LogoutIcon />,
      title: 'Logout',
      description: 'Sign out of your account',
      onClick: () => {},
      color: 'error'
    }
  ]

  return (
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
      backgroundColor: 'background.default',
      pb: 7,
      position: 'relative',
      pt: 4
    }}>
      <AppBar title="Settings" onBack={onBack} showBack={false} />
      <Container 
        maxWidth="sm" 
        sx={{ 
          flex: 1, 
          py: 3, 
          overflowY: 'auto',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          msOverflowStyle: 'none',
        }}
      >
        {/* Settings Icon */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              backgroundColor: 'primary.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 2
            }}
          >
            <SettingsIcon sx={{ fontSize: 48, color: '#fff' }} />
          </Box>
        </Box>
        <Card elevation={0} sx={{ backgroundColor: 'surface.main', border: '1px solid', borderColor: 'divider' }}>
          <List sx={{ p: 0 }}>
            {settingsItems.map((item, index) => (
              <Box key={item.id}>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={item.onClick}
                    sx={{
                      py: 2,
                      px: 2,
                      '&:hover': {
                        backgroundColor: 'action.hover',
                      },
                      ...(item.color === 'error' && {
                        '&:hover': {
                          backgroundColor: 'error.light',
                        }
                      })
                    }}
                  >
                    <ListItemIcon sx={{ 
                      minWidth: 48, 
                      color: item.color === 'error' ? 'error.main' : 'text.secondary' 
                    }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.title}
                      secondary={item.description}
                      primaryTypographyProps={{
                        variant: 'body1',
                        fontWeight: 500,
                        color: item.color === 'error' ? 'error.main' : 'text.primary'
                      }}
                      secondaryTypographyProps={{
                        variant: 'body2',
                        color: 'text.secondary'
                      }}
                    />
                    {item.hasSwitch && (
                      <ListItemSecondaryAction>
                        <Switch
                          edge="end"
                          checked={item.switchValue}
                          onChange={(e) => item.onSwitchChange?.(e.target.checked)}
                          color="primary"
                        />
                      </ListItemSecondaryAction>
                    )}
                  </ListItemButton>
                </ListItem>
                {index < settingsItems.length - 1 && <Divider />}
              </Box>
            ))}
          </List>
        </Card>
      </Container>
      <BottomNav value={currentNav} onChange={onNavChange || (() => {})} />
    </Box>
  )
}
