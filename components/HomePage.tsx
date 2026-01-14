'use client'

import { useState, useEffect } from 'react'
import { Box, Container, Card, Typography, Chip, AppBar, Toolbar, Avatar, IconButton, Badge, Button, TextField, InputAdornment } from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import StarIcon from '@mui/icons-material/Star'
import NotificationsIcon from '@mui/icons-material/Notifications'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import BottomNav from './BottomNav'

interface HomePageProps {
  onNavigate: (page: 'recipes' | 'image-to-description' | 'meal-schedule' | 'day-meals' | 'recipe-details', dayData?: { dayName: string, meals: any[] }, recipeId?: string) => void
  currentNav?: string
  onNavChange?: (value: string) => void
}

const popularRecipes = [
  {
    id: '3',
    title: 'Chicken Curry',
    category: 'Indian',
    time: '15 mins',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop',
    onClick: () => {}
  },
  {
    id: '1',
    title: 'Pasta Carbonara',
    category: 'Italian',
    time: '20 mins',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop',
    onClick: () => {}
  },
  {
    id: '9',
    title: 'Tuna Salad',
    category: 'Salad',
    time: '15 mins',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop',
    onClick: () => {}
  }
]

const ingredientAds = [
  {
    id: 1,
    company: 'Premium Tuna',
    tagline: 'Fresh Ocean-Caught Tuna',
    image: '/ced3e99ae0f0ee04745910ca634d32c4.jpg',
    color: '#0066CC'
  },
  {
    id: 2,
    company: 'Premium Flour',
    tagline: 'High Quality All-Purpose Flour',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&h=400&fit=crop',
    color: '#F4E4BC'
  },
  {
    id: 3,
    company: 'Premium Rice',
    tagline: 'High Quality Basmati Rice',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&h=400&fit=crop',
    color: '#F4E4BC'
  }
]

export default function HomePage({ onNavigate, currentNav = 'home', onNavChange }: HomePageProps) {
  const handleRecipeClick = (recipeId: string) => {
    onNavigate('recipe-details', undefined, recipeId)
  }
  const [currentAdIndex, setCurrentAdIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prev) => (prev + 1) % ingredientAds.length)
    }, 4000) // Change slide every 4 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
              backgroundColor: 'background.default',
      pb: 7,
      position: 'relative'
    }}>
      <AppBar 
        position="static" 
        elevation={0}
        sx={{
              backgroundColor: 'background.default',
          color: 'text.primary',
          pt: 3
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', px: 2, pt: 0, pb: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Avatar 
              sx={{ 
                width: 40, 
                height: 40,
                backgroundColor: 'primary.main',
                color: '#fff'
              }}
            >
              JD
            </Avatar>
            <Typography 
              variant="body1" 
              sx={{ 
                fontWeight: 600,
                color: 'text.primary'
              }}
            >
              John Doe
            </Typography>
          </Box>
          <IconButton 
            sx={{ 
              color: 'text.primary'
            }}
          >
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box sx={{ 
        flex: 1, 
        py: 3, 
        overflowY: 'auto',
        scrollbarWidth: 'none', // Firefox
        '&::-webkit-scrollbar': {
          display: 'none', // Chrome, Safari, Edge
        },
        msOverflowStyle: 'none', // IE and Edge
      }}>
        {/* Search Bar */}
        <Box sx={{ px: 2, mb: 2 }}>
          <TextField
            fullWidth
            placeholder="Search recipes..."
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ mr: 0 }}>
                  <Box
                    sx={{
                      backgroundColor: 'primary.main',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 36,
                      height: 36,
                      mr: .5
                    }}
                  >
                    <IconButton
                      onClick={() => onNavigate('image-to-description')}
                      edge="end"
                      size="small"
                      sx={{ 
                        color: '#fff',
                        padding: 0.5
                      }}
                    >
                      <CameraAltIcon sx={{ fontSize: 20 }} />
                    </IconButton>
                  </Box>
                </InputAdornment>
              ),
            }}
            sx={{
              backgroundColor: '#fff',
              borderRadius: 3,
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                paddingRight: 0,
                height: 42,
                border: '1px solid',
                borderColor: 'divider',
                '& fieldset': {
                  borderColor: 'divider',
                  borderWidth: '1px',
                },
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                  borderWidth: '1px',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                  borderWidth: '2px',
                },
              },
              '& .MuiInputBase-input': {
                py: 0,
                height: 36,
                display: 'flex',
                alignItems: 'center',
              },
            }}
          />
        </Box>

        {/* Ads Title */}
        <Typography 
          variant="h6" 
          component="h2" 
          sx={{ 
            color: 'text.primary', 
            mb: 1.5,
            fontWeight: 600,
            textAlign: 'left',
            px: 2
          }}
        >
          Ads Space
        </Typography>

        {/* Ads Slider Banner */}
        <Box
          sx={{
            mx: 2,
            mb: 3,
            borderRadius: 3,
            position: 'relative',
            overflow: 'hidden',
            height: 140,
            boxShadow: 2
          }}
        >
          <Box
            sx={{
              display: 'flex',
              width: `${ingredientAds.length * 100}%`,
              transform: `translateX(-${currentAdIndex * (100 / ingredientAds.length)}%)`,
              transition: 'transform 0.5s ease-in-out',
              height: '100%'
            }}
          >
            {ingredientAds.map((ad) => (
              <Box
                key={ad.id}
                sx={{
                  width: `${100 / ingredientAds.length}%`,
                  height: '100%',
                  position: 'relative',
                  flexShrink: 0
                }}
              >
                {/* Ad Image Background */}
                <Box
                  component="img"
                  src={ad.image}
                  alt={ad.company}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    position: 'absolute',
                    top: 0,
                    left: 0
                  }}
                />
                
                {/* Dark Overlay for Text Readability */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(to right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3))',
                    zIndex: 1
                  }}
                />

                {/* Ad Content */}
                <Box
                  sx={{
                    position: 'relative',
                    zIndex: 2,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    p: 2.5
                  }}
                >
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: '#fff',
                      fontWeight: 700,
                      mb: 0.5,
                      fontSize: '20px',
                      textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)'
                    }}
                  >
                    {ad.company}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'rgba(255, 255, 255, 0.95)',
                      fontSize: '14px',
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                    }}
                  >
                    {ad.tagline}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>

          {/* Slide Indicators */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 8,
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: 1,
              zIndex: 3
            }}
          >
            {ingredientAds.map((_, index) => (
              <Box
                key={index}
                onClick={() => setCurrentAdIndex(index)}
                sx={{
                  width: currentAdIndex === index ? 24 : 8,
                  height: 8,
                  borderRadius: 1,
                  backgroundColor: currentAdIndex === index ? 'primary.main' : 'rgba(255, 255, 255, 0.5)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Scheduled Recipes Button */}
        <Box sx={{ px: 2, mb: 3 }}>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => {
              const today = new Date()
              const dayName = today.toLocaleDateString('en-US', { weekday: 'long' })
              onNavigate('day-meals', { dayName, meals: [] })
            }}
            sx={{
              py: 1,
              borderColor: 'primary.main',
              color: 'primary.main',
              fontWeight: 600,
              fontSize: '16px',
              textTransform: 'none',
              borderRadius: 2,
              justifyContent: 'space-between',
              textAlign: 'left',
              '&:hover': {
                borderColor: 'primary.dark',
                backgroundColor: 'primary.light',
                color: 'primary.dark',
              }
            }}
            endIcon={<CalendarTodayIcon />}
          >
            Scheduled Recipes
          </Button>
        </Box>

        <Typography 
          variant="h5" 
          component="h1" 
          sx={{ 
            color: 'text.primary', 
            mb: 3,
            fontWeight: 600,
            textAlign: 'left',
            px: 2
          }}
        >
          Popular Recipes
        </Typography>

        <Box
          sx={{
            display: 'flex',
            gap: 2,
            overflowX: 'auto',
            pb: 1,
            scrollbarWidth: 'none', // Firefox
            '&::-webkit-scrollbar': {
              display: 'none', // Chrome, Safari, Edge
            },
            msOverflowStyle: 'none', // IE and Edge
            '& > *:first-of-type': {
              ml: 2,
            },
            '& > *:last-of-type': {
              mr: 2,
            },
          }}
        >
          {popularRecipes.map((recipe) => (
            <Card
              key={recipe.id}
              onClick={() => handleRecipeClick(recipe.id)}
              sx={{
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                borderRadius: 3,
                overflow: 'hidden',
                minWidth: 200,
                maxWidth: 200,
                flexShrink: 0,
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
                border: 'none',
                boxShadow: 2,
              }}
            >
                {/* Recipe Image */}
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: 180,
                    backgroundColor: 'grey.300',
                    overflow: 'hidden'
                  }}
                >
                  <Box
                    component="img"
                    src={recipe.image}
                    alt={recipe.title}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                    onError={(e) => {
                      // Fallback to gradient if image fails
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                  
                  {/* Time Badge */}
                  <Chip
                    icon={<AccessTimeIcon sx={{ fontSize: 14 }} />}
                    label={recipe.time}
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 8,
                      left: 8,
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      color: 'text.primary',
                      fontWeight: 500,
                      fontSize: '11px',
                      height: '24px',
                      '& .MuiChip-icon': {
                        color: 'text.secondary',
                        fontSize: 14
                      }
                    }}
                  />

                  {/* Rating Badge */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      backgroundColor: 'tertiary.main',
                      color: 'text.primary',
                      px: 1,
                      py: 0.5,
                      borderRadius: 2,
                      fontSize: '12px',
                      fontWeight: 600
                    }}
                  >
                    <StarIcon sx={{ fontSize: 16, color: 'text.primary' }} />
                    {recipe.rating}
                  </Box>

                  {/* Text Overlay at Bottom */}
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3), transparent)',
                      p: 1.5,
                      pt: 3
                    }}
                  >
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: '#fff',
                        fontWeight: 600,
                        mb: 0.5,
                        fontSize: '14px',
                        lineHeight: 1.3,
                        textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                      }}
                    >
                      {recipe.title}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontSize: '12px',
                        textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                      }}
                    >
                      {recipe.category}
                    </Typography>
                  </Box>
                </Box>
              </Card>
          ))}
        </Box>
      </Box>
      <BottomNav value={currentNav} onChange={onNavChange || (() => {})} />
    </Box>
  )
}
