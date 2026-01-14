'use client'

import { useState } from 'react'
import { Box, Container, TextField, Typography, Card, CardContent, List, ListItem, ListItemText, Stack, InputAdornment, IconButton, Chip } from '@mui/material'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import StarIcon from '@mui/icons-material/Star'
import AppBar from './AppBar'

interface RecipeByNamePageProps {
  onBack: () => void
  onNavigate?: (page: string, recipeId: string) => void
  currentNav?: string
  onNavChange?: (value: string) => void
}

interface Recipe {
  id: string
  name: string
  image: string
  rating: number
  ingredients: string[]
  method: string[]
}

const dummyRecipes: Recipe[] = [
  {
    id: '1',
    name: 'Pasta Carbonara',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop',
    rating: 4.8,
    ingredients: [
      '400g spaghetti',
      '200g pancetta or bacon',
      '4 large eggs',
      '100g parmesan cheese',
      'Black pepper',
      'Salt'
    ],
    method: [
      'Cook pasta in salted water until al dente',
      'Fry pancetta until crispy',
      'Mix eggs and parmesan in a bowl',
      'Drain pasta and mix with pancetta',
      'Add egg mixture off heat, stirring quickly',
      'Season with black pepper and serve'
    ]
  },
  {
    id: '2',
    name: 'Chocolate Cake',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
    rating: 4.6,
    ingredients: [
      '200g flour',
      '200g sugar',
      '100g cocoa powder',
      '2 eggs',
      '100ml milk',
      '100ml oil',
      '1 tsp baking powder'
    ],
    method: [
      'Preheat oven to 180°C',
      'Mix dry ingredients in a bowl',
      'Whisk eggs, milk, and oil together',
      'Combine wet and dry ingredients',
      'Pour into greased cake tin',
      'Bake for 30-35 minutes',
      'Cool before serving'
    ]
  },
  {
    id: '3',
    name: 'Chicken Curry',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop',
    rating: 4.9,
    ingredients: [
      '500g chicken breast',
      '2 onions',
      '3 tomatoes',
      '2 tbsp curry powder',
      '200ml coconut milk',
      '2 cloves garlic',
      '1 inch ginger',
      'Salt and oil'
    ],
    method: [
      'Cut chicken into pieces',
      'Heat oil and fry onions until golden',
      'Add garlic and ginger, cook for 1 minute',
      'Add chicken and cook until sealed',
      'Add tomatoes and curry powder',
      'Pour coconut milk and simmer 20 minutes',
      'Season and serve with rice'
    ]
  }
]

export default function RecipeByNamePage({ onBack, onNavigate, currentNav = 'recipe-by-name', onNavChange }: RecipeByNamePageProps) {
  const [recipeName, setRecipeName] = useState('')
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(false)

  const handleSearch = () => {
    if (!recipeName.trim()) return
    
    setLoading(true)
    setTimeout(() => {
      const lowerName = recipeName.toLowerCase()
      const found = dummyRecipes.filter(recipe => 
        recipe.name.toLowerCase().includes(lowerName) || lowerName.includes(recipe.name.toLowerCase())
      )
      
      if (found.length > 0) {
        setRecipes(found)
      } else {
        // Return all recipes if no match
        setRecipes(dummyRecipes)
      }
      setLoading(false)
    }, 1000)
  }

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
      <AppBar title="Recipe by Name" onBack={onBack} showBack={true} />
      <Container 
        maxWidth="sm" 
        sx={{ 
          flex: 1, 
          py: 3, 
          overflowY: 'auto',
          scrollbarWidth: 'none', // Firefox
          '&::-webkit-scrollbar': {
            display: 'none', // Chrome, Safari, Edge
          },
          msOverflowStyle: 'none', // IE and Edge
        }}
      >
        {/* Search Bar (copied from HomePage with Recipe search behavior) */}
        <Box sx={{ px: 0, mb: 2 }}>
          <TextField
            fullWidth
            placeholder="Enter recipe name..."
            variant="outlined"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
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
                      onClick={handleSearch}
                      edge="end"
                      size="small"
                      sx={{ 
                        color: '#fff',
                        padding: 0.5
                      }}
                      disabled={loading || !recipeName.trim()}
                    >
                      <CameraAltIcon sx={{ fontSize: 20, color: '#fff' }} />
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

        {recipes.length > 0 && (
          <Stack spacing={2}>
            {recipes.map((recipe) => (
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
                        {recipe.ingredients.length} ingredients
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

        {recipes.length === 0 && !loading && (
          <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary', py: 4 }}>
            Enter a recipe name to get started
          </Typography>
        )}
      </Container>
    </Box>
  )
}
