'use client'

import { Box, Container, Typography, Card, Stack, Chip } from '@mui/material'
import AppBar from './AppBar'

interface Meal {
  id: string
  recipeName: string
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'after-noon-coffee'
}

// Recipe name to image mapping
const recipeImages: Record<string, string> = {
  'Pasta Carbonara': 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop',
  'Chocolate Cake': 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
  'Chicken Curry': 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop',
  'Vegetable Stir Fry': 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop',
  'Grilled Salmon': 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop',
  'Beef Steak': 'https://images.unsplash.com/photo-1546837522-1b2b3b4b5b6b?w=400&h=300&fit=crop',
  'Caesar Salad': 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop',
  'Tomato Soup': 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop',
  'Pizza Margherita': 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop',
  'Sushi Rolls': 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop',
  'Tacos': 'https://images.unsplash.com/photo-1565299585323-38174c0b5a0a?w=400&h=300&fit=crop'
}

// Recipe name to ID and ingredient count mapping (matching RecipeDetailsPage data)
const recipeData: Record<string, { id: string, ingredientCount: number }> = {
  'Pasta Carbonara': { id: '1', ingredientCount: 6 },
  'Chocolate Cake': { id: '2', ingredientCount: 7 },
  'Chicken Curry': { id: '3', ingredientCount: 8 },
  'Vegetable Stir Fry': { id: '4', ingredientCount: 6 },
  'Grilled Salmon': { id: '5', ingredientCount: 5 },
  'Beef Steak': { id: '6', ingredientCount: 6 },
  'Caesar Salad': { id: '7', ingredientCount: 7 },
  'Tomato Soup': { id: '8', ingredientCount: 7 },
  'Pizza Margherita': { id: '9', ingredientCount: 5 },
  'Sushi Rolls': { id: '10', ingredientCount: 6 },
  'Tacos': { id: '11', ingredientCount: 6 }
}

interface DayMealsPageProps {
  dayName: string
  meals: Meal[]
  onBack: () => void
  onNavigate?: (page: 'recipe-details', recipeId: string) => void
  currentNav?: string
  onNavChange?: (value: string) => void
}

export default function DayMealsPage({ dayName, meals, onBack, onNavigate, currentNav = 'day-meals', onNavChange }: DayMealsPageProps) {
  const handleRecipeClick = (recipeName: string) => {
    const recipe = recipeData[recipeName]
    if (recipe && onNavigate) {
      onNavigate('recipe-details', recipe.id)
    }
  }

  // Group meals by meal type
  const groupedMeals = meals.reduce((acc, meal) => {
    const type = meal.mealType
    if (!acc[type]) {
      acc[type] = []
    }
    acc[type].push(meal)
    return acc
  }, {} as Record<string, Meal[]>)

  // Define meal type order and display names
  const mealTypeOrder: Array<{ type: string, label: string }> = [
    { type: 'breakfast', label: 'Breakfast' },
    { type: 'lunch', label: 'Lunch' },
    { type: 'after-noon-coffee', label: 'After Noon Coffee' },
    { type: 'dinner', label: 'Dinner' }
  ]
  return (
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
      backgroundColor: 'background.default',
      position: 'relative',
      pt: 4
    }}>
      <AppBar title={`${dayName} Meals`} onBack={onBack} showBack={true} />
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
        {meals.length === 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
              No meals scheduled for this day
            </Typography>
          </Box>
        ) : (
          <Stack spacing={3}>
            {mealTypeOrder.map(({ type, label }) => {
              const mealsOfType = groupedMeals[type] || []
              if (mealsOfType.length === 0) return null

              return (
                <Box key={type}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: 'text.primary',
                      fontWeight: 600,
                      mb: 2,
                      fontSize: '18px'
                    }}
                  >
                    {label}
                  </Typography>
                  <Stack spacing={2}>
                    {mealsOfType.map((meal) => {
                      const recipe = recipeData[meal.recipeName] || { id: '', ingredientCount: 0 }
                      return (
                        <Card
                          key={meal.id}
                          onClick={() => handleRecipeClick(meal.recipeName)}
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
                                src={recipeImages[meal.recipeName] || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop'}
                                alt={meal.recipeName}
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
                                  {meal.recipeName}
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
                              </Box>
                            </Box>
                          </Box>
                        </Card>
                      )
                    })}
                  </Stack>
                </Box>
              )
            })}
          </Stack>
        )}
      </Container>
    </Box>
  )
}
