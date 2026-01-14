'use client'

import { Box, Container, Typography, Card, Stack, IconButton } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import AddIcon from '@mui/icons-material/Add'
import AppBar from './AppBar'

interface Recipe {
  id: string
  name: string
  image: string
  rating: number
  ingredientCount: number
}

interface MyRecipesPageProps {
  onBack: () => void
  onNavigate?: (page: 'recipe-details' | 'create-recipe', recipeId?: string) => void
  currentNav?: string
  onNavChange?: (value: string) => void
}

// Dummy saved recipes data
const savedRecipes: Recipe[] = [
  {
    id: '1',
    name: 'Pasta Carbonara',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop',
    rating: 4.8,
    ingredientCount: 6
  },
  {
    id: '3',
    name: 'Chicken Curry',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop',
    rating: 4.9,
    ingredientCount: 8
  },
  {
    id: '4',
    name: 'Vegetable Stir Fry',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop',
    rating: 4.5,
    ingredientCount: 6
  }
]

export default function MyRecipesPage({ onBack, onNavigate, currentNav = 'my-recipes', onNavChange }: MyRecipesPageProps) {
  const handleRecipeClick = (recipeId: string) => {
    if (onNavigate) {
      onNavigate('recipe-details', recipeId)
    }
  }

  return (
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
      backgroundColor: 'background.default',
      position: 'relative',
      pt: 4
    }}>
      <AppBar 
        title="My Recipes" 
        onBack={onBack} 
        showBack={true}
        rightAction={
          <IconButton
            color="inherit"
            onClick={() => onNavigate && onNavigate('create-recipe')}
            sx={{ color: 'primary.main' }}
          >
            <AddIcon />
          </IconButton>
        }
      />
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
        {savedRecipes.length === 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
              No saved recipes yet
            </Typography>
          </Box>
        ) : (
          <Stack spacing={2}>
            {savedRecipes.map((recipe) => (
              <Card
                key={recipe.id}
                onClick={() => handleRecipeClick(recipe.id)}
                sx={{
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  borderRadius: 3,
                  overflow: 'hidden',
                  boxShadow: 2,
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                  },
                  backgroundColor: 'surface.main',
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                  {/* Recipe Image */}
                  <Box
                    sx={{
                      width: 120,
                      height: 120,
                      flexShrink: 0,
                      backgroundColor: 'grey.300',
                      overflow: 'hidden'
                    }}
                  >
                    <Box
                      component="img"
                      src={recipe.image}
                      alt={recipe.name}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </Box>
                  
                  {/* Recipe Info */}
                  <Box sx={{ flex: 1, p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          color: 'text.primary',
                          fontWeight: 600,
                          mb: 0.5,
                          fontSize: '16px'
                        }}
                      >
                        {recipe.name}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: 'text.secondary',
                          mb: 1,
                          fontSize: '13px'
                        }}
                      >
                        {recipe.ingredientCount} ingredients
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <StarIcon sx={{ fontSize: 18, color: 'tertiary.main' }} />
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: 'text.primary',
                            fontWeight: 600,
                            fontSize: '14px'
                          }}
                        >
                          {recipe.rating}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Card>
            ))}
          </Stack>
        )}
      </Container>
    </Box>
  )
}
