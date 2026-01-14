'use client'

import { Box, Container, Card, CardContent, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import DinnerDiningIcon from '@mui/icons-material/DinnerDining'
import AddIcon from '@mui/icons-material/Add'
import AppBar from './AppBar'
import BottomNav from './BottomNav'

interface RecipesPageProps {
  onNavigate: (page: 'recipe-by-name' | 'recipes-by-ingredients' | 'my-recipes' | 'create-recipe') => void
  onBack: () => void
  currentNav?: string
  onNavChange?: (value: string) => void
}

export default function RecipesPage({ onNavigate, onBack, currentNav = 'recipes', onNavChange }: RecipesPageProps) {
  const menuItems = [
    {
      id: 'create-recipe',
      icon: <AddIcon sx={{ fontSize: 28 }} />,
      title: 'Create Recipe',
      description: 'Create and share your own recipe',
      color: 'primary',
      onClick: () => onNavigate('create-recipe')
    },
    {
      id: 'recipe-by-name',
      icon: <RestaurantIcon sx={{ fontSize: 28 }} />,
      title: 'Recipe by Name',
      description: 'Get ingredients and method for any recipe',
      color: 'primary',
      onClick: () => onNavigate('recipe-by-name')
    },
    {
      id: 'recipes-by-ingredients',
      icon: <ShoppingCartIcon sx={{ fontSize: 28 }} />,
      title: 'Recipes by Ingredients',
      description: 'Find recipes with your available ingredients',
      color: 'secondary',
      onClick: () => onNavigate('recipes-by-ingredients')
    },
    {
      id: 'my-recipes',
      icon: <DinnerDiningIcon sx={{ fontSize: 28 }} />,
      title: 'My Recipes',
      description: 'View and manage your saved recipes',
      color: 'primary',
      onClick: () => onNavigate('my-recipes')
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
      <AppBar title="Recipes" onBack={onBack} showBack={false} />
      <Box sx={{ flex: 1, py: 3, overflowY: 'auto' }}>
        {/* Dish Icon */}
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
            <DinnerDiningIcon sx={{ fontSize: 48, color: '#fff' }} />
          </Box>
        </Box>
        <Box>
          {menuItems.map((item, index) => (
            <Card 
              key={item.id}
              elevation={0} 
              sx={{ 
                backgroundColor: 'surface.main', 
                border: '1px solid', 
                borderColor: 'divider',
                mb: 1,
                mx: 1
              }}
            >
              <ListItem disablePadding>
                <ListItemButton
                  onClick={item.onClick}
                  sx={{
                    py: 0.5,
                    px: 2,
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 48, color: `${item.color}.main` }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    secondary={item.description}
                    primaryTypographyProps={{
                      variant: 'body1',
                      fontWeight: 500,
                      color: 'text.primary'
                    }}
                    secondaryTypographyProps={{
                      variant: 'body2',
                      color: 'text.secondary'
                    }}
                  />
                  <ListItemIcon sx={{ minWidth: 'auto', color: 'text.secondary' }}>
                    <ArrowForwardIosIcon fontSize="small" />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            </Card>
          ))}
        </Box>
      </Box>
      <BottomNav value={currentNav} onChange={onNavChange || (() => {})} />
    </Box>
  )
}
