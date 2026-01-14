'use client'

import { useState } from 'react'
import { Box, Container, TextField, Button, Typography, Card, CardContent, CircularProgress, Stack, Chip } from '@mui/material'
import AppBar from './AppBar'

interface RecipesByIngredientsPageProps {
  onBack: () => void
  onNavigate?: (page: string, recipeId: string) => void
  currentNav?: string
  onNavChange?: (value: string) => void
}

const dummyRecipes = [
  {
    id: '4',
    name: 'Vegetable Stir Fry',
    ingredients: ['carrots', 'broccoli', 'bell pepper', 'soy sauce'],
    description: 'Quick and healthy vegetable stir fry with a savory sauce'
  },
  {
    id: '5',
    name: 'Pasta Primavera',
    ingredients: ['pasta', 'tomatoes', 'garlic', 'olive oil'],
    description: 'Fresh pasta with seasonal vegetables in a light sauce'
  },
  {
    id: '6',
    name: 'Chicken Salad',
    ingredients: ['chicken', 'lettuce', 'tomatoes', 'cucumber'],
    description: 'Refreshing salad with grilled chicken and fresh vegetables'
  },
  {
    id: '7',
    name: 'Tomato Soup',
    ingredients: ['tomatoes', 'onion', 'garlic', 'basil'],
    description: 'Creamy and comforting tomato soup with herbs'
  },
  {
    id: '8',
    name: 'Garlic Bread',
    ingredients: ['bread', 'garlic', 'butter', 'parsley'],
    description: 'Crispy bread with garlic butter and fresh herbs'
  }
]

export default function RecipesByIngredientsPage({ onBack, onNavigate, currentNav = 'recipes-by-ingredients', onNavChange }: RecipesByIngredientsPageProps) {
  const handleRecipeClick = (recipeId: string) => {
    if (onNavigate) {
      onNavigate('recipe-details', recipeId)
    }
  }
  const [ingredients, setIngredients] = useState('')
  const [recipes, setRecipes] = useState<typeof dummyRecipes>([])
  const [loading, setLoading] = useState(false)

  const handleSearch = () => {
    if (!ingredients.trim()) return
    
    setLoading(true)
    setTimeout(() => {
      const inputIngredients = ingredients.toLowerCase().split(',').map(i => i.trim())
      
      const matched = dummyRecipes.filter(recipe => {
        const matchCount = recipe.ingredients.filter(ing => 
          inputIngredients.some(input => ing.includes(input) || input.includes(ing))
        ).length
        return matchCount >= 2
      })
      
      setRecipes(matched.length > 0 ? matched : dummyRecipes.slice(0, 3))
      setLoading(false)
    }, 1000)
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
      <AppBar title="Recipes by Ingredients" onBack={onBack} showBack={true} />
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
        <Card elevation={0} sx={{ mb: 3, backgroundColor: 'surface.main' }}>
          <CardContent>
            <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
              Enter ingredients (comma separated)
            </Typography>
            <Stack spacing={2}>
              <TextField
                fullWidth
                multiline
                rows={4}
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="e.g., chicken, tomatoes, garlic, pasta..."
                variant="outlined"
              />
              <Button
                variant="contained"
                onClick={handleSearch}
                disabled={loading || !ingredients.trim()}
                fullWidth
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Find Recipes'}
              </Button>
            </Stack>
          </CardContent>
        </Card>

        {recipes.length > 0 && (
          <Stack spacing={2}>
            <Typography variant="h6" sx={{ color: 'text.primary' }}>
              Found {recipes.length} recipe{recipes.length !== 1 ? 's' : ''}
            </Typography>
            {recipes.map((recipe, index) => (
              <Card 
                key={index} 
                elevation={0} 
                onClick={() => handleRecipeClick(recipe.id)}
                sx={{ 
                  backgroundColor: 'surface.main', 
                  border: '1px solid', 
                  borderColor: 'divider',
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 2,
                  }
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ color: 'text.primary' }}>
                    {recipe.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                    {recipe.description}
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {recipe.ingredients.map((ing, i) => (
                      <Chip
                        key={i}
                        label={ing}
                        size="small"
                        sx={{
                          backgroundColor: 'primary.light',
                          color: '#fff',
                        }}
                      />
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}

        {recipes.length === 0 && !loading && (
          <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary', py: 4 }}>
            Enter ingredients to find matching recipes
          </Typography>
        )}
      </Container>
    </Box>
  )
}
