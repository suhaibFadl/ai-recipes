'use client'

import { useState } from 'react'
import { 
  Box, 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel,
  Chip,
  IconButton,
  Stack
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import AppBar from './AppBar'
import BottomNav from './BottomNav'

interface MealSchedulePageProps {
  onBack: () => void
  onNavigate?: (dayDate: string, dayName: string, meals: Meal[]) => void
  currentNav?: string
  onNavChange?: (value: string) => void
}

interface Meal {
  id: string
  recipeName: string
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'after-noon-coffee'
}

interface DaySchedule {
  date: string
  dayName: string
  meals: Meal[]
}

const dummyRecipes = [
  'Pasta Carbonara',
  'Chicken Curry',
  'Vegetable Stir Fry',
  'Grilled Salmon',
  'Beef Steak',
  'Caesar Salad',
  'Tomato Soup',
  'Pizza Margherita',
  'Sushi Rolls',
  'Tacos'
]

export default function MealSchedulePage({ onBack, onNavigate, currentNav = 'meal-schedule', onNavChange }: MealSchedulePageProps) {
  const [schedules, setSchedules] = useState<DaySchedule[]>(() => {
    // Initialize with next 7 days
    const days: DaySchedule[] = []
    const today = new Date()
    for (let i = 0; i < 7; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      days.push({
        date: date.toISOString().split('T')[0],
        dayName: date.toLocaleDateString('en-US', { weekday: 'long' }),
        meals: []
      })
    }
    return days
  })

  const [openDialog, setOpenDialog] = useState(false)
  const [selectedDay, setSelectedDay] = useState<string>('')
  const [newMeal, setNewMeal] = useState({ recipeName: '', mealType: 'lunch' as 'breakfast' | 'lunch' | 'dinner' | 'after-noon-coffee' })

  const handleAddMeal = (dayDate: string) => {
    setSelectedDay(dayDate)
    setNewMeal({ recipeName: '', mealType: 'lunch' })
    setOpenDialog(true)
  }

  const handleSaveMeal = () => {
    if (!newMeal.recipeName) return

    setSchedules(prev => prev.map(day => {
      if (day.date === selectedDay) {
        return {
          ...day,
          meals: [...day.meals, {
            id: Date.now().toString(),
            recipeName: newMeal.recipeName,
            mealType: newMeal.mealType
          }]
        }
      }
      return day
    }))

    setOpenDialog(false)
    setNewMeal({ recipeName: '', mealType: 'lunch' })
  }

  const handleDeleteMeal = (dayDate: string, mealId: string) => {
    setSchedules(prev => prev.map(day => {
      if (day.date === dayDate) {
        return {
          ...day,
          meals: day.meals.filter(meal => meal.id !== mealId)
        }
      }
      return day
    }))
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

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
      <AppBar title="Meal Schedule" onBack={onBack} showBack={false} />
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
        {/* Calendar Icon */}
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
            <CalendarTodayIcon sx={{ fontSize: 48, color: '#fff' }} />
          </Box>
        </Box>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, textAlign: 'center' }}>
          Schedule your meals for the week
        </Typography>

        <Stack spacing={2}>
          {schedules.map((day) => (
            <Card 
              key={day.date} 
              elevation={0} 
              sx={{ 
                backgroundColor: 'surface.main', 
                border: '1px solid', 
                borderColor: 'divider',
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: 2,
                }
              }}
              onClick={() => onNavigate && onNavigate(day.date, day.dayName, day.meals)}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Box>
                    <Typography variant="h6" sx={{ color: 'text.primary' }}>
                      {day.dayName}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {formatDate(day.date)}
                    </Typography>
                  </Box>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<AddIcon />}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleAddMeal(day.date)
                    }}
                    sx={{ textTransform: 'none' }}
                  >
                    Add Meal
                  </Button>
                </Box>

                {day.meals.length === 0 ? (
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic', py: 2 }}>
                    No meals scheduled
                  </Typography>
                ) : (
                  <Stack spacing={1}>
                    {day.meals.map((meal) => (
                      <Box
                        key={meal.id}
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          p: 1.5,
                          backgroundColor: 'background.default',
                          borderRadius: 1,
                          border: '1px solid',
                          borderColor: 'divider'
                        }}
                      >
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 500 }}>
                            {meal.recipeName}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                            {meal.mealType}
                          </Typography>
                        </Box>
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteMeal(day.date, meal.id)
                          }}
                          sx={{ color: 'error.main' }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    ))}
                  </Stack>
                )}
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Container>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Meal</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <FormControl fullWidth>
              <InputLabel>Recipe</InputLabel>
              <Select
                value={newMeal.recipeName}
                onChange={(e) => setNewMeal({ ...newMeal, recipeName: e.target.value })}
                label="Recipe"
              >
                {dummyRecipes.map((recipe) => (
                  <MenuItem key={recipe} value={recipe}>
                    {recipe}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Meal Type</InputLabel>
              <Select
                value={newMeal.mealType}
                onChange={(e) => setNewMeal({ ...newMeal, mealType: e.target.value as 'breakfast' | 'lunch' | 'dinner' | 'after-noon-coffee' })}
                label="Meal Type"
              >
                <MenuItem value="breakfast">Breakfast</MenuItem>
                <MenuItem value="lunch">Lunch</MenuItem>
                <MenuItem value="after-noon-coffee">After Noon Coffee</MenuItem>
                <MenuItem value="dinner">Dinner</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} sx={{ textTransform: 'none' }}>
            Cancel
          </Button>
          <Button 
            onClick={handleSaveMeal} 
            variant="contained"
            disabled={!newMeal.recipeName}
            sx={{ textTransform: 'none' }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <BottomNav value={currentNav} onChange={onNavChange || (() => {})} />
    </Box>
  )
}
