'use client'

import { useState, useRef, useEffect } from 'react'
import { Box, Container, Typography, Card, CardContent, List, ListItem, ListItemText, Stack, AppBar as MuiAppBar, Toolbar, IconButton, Button, Rating, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Chip } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import StarIcon from '@mui/icons-material/Star'

interface RecipeDetailsPageProps {
  recipeId: string
  onBack: () => void
  currentNav?: string
  onNavChange?: (value: string) => void
}

const dummyRecipes: Record<string, { name: string, image: string, rating: number, ingredients: string[], method: string[] }> = {
  '1': {
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
  '2': {
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
  '3': {
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
  },
  '4': {
    name: 'Vegetable Stir Fry',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop',
    rating: 4.5,
    ingredients: [
      '2 carrots, sliced',
      '1 cup broccoli florets',
      '1 bell pepper, sliced',
      '2 tbsp soy sauce',
      '1 tbsp oil',
      '2 cloves garlic, minced'
    ],
    method: [
      'Heat oil in a large pan',
      'Add garlic and stir for 30 seconds',
      'Add carrots and cook for 2 minutes',
      'Add broccoli and bell pepper',
      'Stir fry for 3-4 minutes',
      'Add soy sauce and cook for 1 more minute',
      'Serve hot'
    ]
  },
  '5': {
    name: 'Pasta Primavera',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop',
    rating: 4.7,
    ingredients: [
      '300g pasta',
      '2 tomatoes, diced',
      '3 cloves garlic, minced',
      '2 tbsp olive oil',
      'Fresh basil',
      'Salt and pepper'
    ],
    method: [
      'Cook pasta according to package directions',
      'Heat olive oil in a pan',
      'Add garlic and cook until fragrant',
      'Add tomatoes and cook for 5 minutes',
      'Drain pasta and add to pan',
      'Toss with sauce and basil',
      'Season and serve'
    ]
  },
  '6': {
    name: 'Chicken Salad',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
    rating: 4.6,
    ingredients: [
      '200g cooked chicken, shredded',
      '2 cups lettuce',
      '2 tomatoes, sliced',
      '1 cucumber, sliced',
      '2 tbsp olive oil',
      '1 tbsp lemon juice',
      'Salt and pepper'
    ],
    method: [
      'Prepare all vegetables',
      'Arrange lettuce on a plate',
      'Add tomatoes and cucumber',
      'Top with shredded chicken',
      'Drizzle with olive oil and lemon juice',
      'Season with salt and pepper',
      'Toss and serve'
    ]
  },
  '7': {
    name: 'Tomato Soup',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop',
    rating: 4.4,
    ingredients: [
      '6 tomatoes, chopped',
      '1 onion, diced',
      '3 cloves garlic, minced',
      'Fresh basil leaves',
      '2 cups vegetable broth',
      '2 tbsp olive oil',
      'Salt and pepper'
    ],
    method: [
      'Heat oil in a pot',
      'Add onion and garlic, cook until soft',
      'Add tomatoes and cook for 10 minutes',
      'Add vegetable broth and bring to boil',
      'Simmer for 15 minutes',
      'Blend until smooth',
      'Season and serve with basil'
    ]
  },
  '8': {
    name: 'Garlic Bread',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop',
    rating: 4.8,
    ingredients: [
      '1 loaf bread',
      '4 cloves garlic, minced',
      '4 tbsp butter, softened',
      '2 tbsp fresh parsley, chopped',
      'Salt to taste'
    ],
    method: [
      'Preheat oven to 200°C',
      'Mix butter, garlic, and parsley',
      'Slice bread diagonally',
      'Spread butter mixture on bread',
      'Bake for 10-12 minutes until golden',
      'Serve warm'
    ]
  },
  '9': {
    name: 'Tuna Salad',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop',
    rating: 4.6,
    ingredients: [
      '2 cans tuna, drained',
      '1/2 cup mayonnaise',
      '1/4 cup celery, diced',
      '1/4 cup red onion, diced',
      '2 tbsp lemon juice',
      'Salt and pepper to taste'
    ],
    method: [
      'Drain tuna and flake with a fork',
      'Mix tuna with mayonnaise',
      'Add celery and red onion',
      'Stir in lemon juice',
      'Season with salt and pepper',
      'Chill for 30 minutes before serving'
    ]
  }
}

export default function RecipeDetailsPage({ recipeId, onBack, currentNav = 'recipe-details', onNavChange }: RecipeDetailsPageProps) {
  const recipe = dummyRecipes[recipeId]
  const [scrollY, setScrollY] = useState(0)
  const [userRating, setUserRating] = useState<number | null>(null)
  const [ratingDialogOpen, setRatingDialogOpen] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const maxImageHeight = 300
  const minImageHeight = 100
  const scrollThreshold = 200 // How much to scroll before fully collapsed

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      setScrollY(container.scrollTop)
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  // Calculate image height based on scroll
  const imageHeight = Math.max(
    minImageHeight,
    maxImageHeight - Math.min(scrollY, scrollThreshold)
  )
  
  // Calculate opacity for toolbar based on scroll
  const toolbarOpacity = Math.min(1, scrollY / 100)

  if (!recipe) {
    return (
      <Box sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        backgroundColor: 'background.default',
        position: 'relative',
        pt: 4
      }}>
        <MuiAppBar 
          position="sticky"
          elevation={0}
          sx={{
            backgroundColor: 'background.default',
            color: 'text.primary',
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              onClick={onBack}
              sx={{ mr: 2 }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
              Recipe Details
            </Typography>
          </Toolbar>
        </MuiAppBar>
        <Container maxWidth="sm" sx={{ flex: 1, py: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Recipe not found
          </Typography>
        </Container>
      </Box>
    )
  }

  return (
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
      backgroundColor: 'background.default',
      position: 'relative'
    }}>
      {/* Sliver App Bar with Image */}
      <MuiAppBar 
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: scrollY > 50 ? 'rgba(253, 251, 248, 0.95)' : 'transparent',
          color: scrollY > 50 ? 'text.primary' : '#fff',
          top: 0,
          zIndex: 5, // Lower than notch (zIndex: 10) so notch appears on top
          pt: 4, // Safe area padding for iPhone notch
          transition: 'background-color 0.3s ease, color 0.3s ease',
          height: `${imageHeight + 64 + 16}px`, // Dynamic height based on scroll
          overflow: 'hidden'
        }}
      >
        {/* Recipe Image Background */}
        <Box
          sx={{
            position: 'absolute',
            top: -16, // Extend into safe area
            left: 0,
            right: 0,
            height: `${imageHeight + 16}px`, // Dynamic height
            zIndex: -1,
            overflow: 'hidden',
            transition: 'height 0.1s ease-out'
          }}
        >
          <Box
            component="img"
            src={recipe.image}
            alt={recipe.name}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: scrollY > 0 ? `scale(${1 + scrollY / 1000})` : 'scale(1)',
              transition: 'transform 0.1s ease-out'
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
              background: scrollY > 50 
                ? 'linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3))'
                : 'linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6))',
              transition: 'background 0.3s ease'
            }}
          />
        </Box>

        {/* Toolbar with Back Button and Title */}
        <Toolbar sx={{ 
          minHeight: '64px !important',
          pt: 0,
          pb: 2,
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          position: 'relative',
          zIndex: 1
        }}>
          <IconButton
            edge="start"
            onClick={onBack}
            sx={{ 
              color: scrollY > 50 ? 'text.primary' : '#fff',
              backgroundColor: scrollY > 50 ? 'transparent' : 'rgba(0, 0, 0, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: scrollY > 50 ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.5)',
              }
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography 
            variant="h5" 
            component="div" 
            sx={{ 
              fontWeight: 600,
              textAlign: 'center',
              flex: 1,
              color: scrollY > 50 ? 'text.primary' : '#fff',
              textShadow: scrollY > 50 ? 'none' : '0 2px 4px rgba(0, 0, 0, 0.5)',
              px: 2,
              transition: 'color 0.3s ease, text-shadow 0.3s ease'
            }}
          >
            {recipe.name}
          </Typography>
          <IconButton
            edge="end"
            sx={{ 
              color: scrollY > 50 ? 'primary.main' : '#fff',
              backgroundColor: scrollY > 50 ? 'transparent' : 'rgba(0, 0, 0, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: scrollY > 50 ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.5)',
              }
            }}
          >
            <FavoriteBorderIcon sx={{ fontSize: 28 }} />
          </IconButton>
        </Toolbar>
      </MuiAppBar>

      {/* Scrollable Content Sliver */}
      <Box
        ref={scrollContainerRef}
        sx={{
          flex: 1,
          overflowY: 'auto',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          msOverflowStyle: 'none',
          mt: `-${maxImageHeight + 20}px`, // Negative margin to overlap app bar
          pt: `${maxImageHeight + 20}px`, // Padding to push content down
          backgroundColor: 'background.default',
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          position: 'relative',
          zIndex: 1, // Above the app bar
        }}
      >
         <Container 
           maxWidth="sm" 
           sx={{ 
             py: 3,
             minHeight: '100%',
           }}
         >
           <Stack spacing={3}>
             <Box>
               {/* Buttons Row */}
               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                 <Button
                   variant="outlined"
                   startIcon={<CalendarTodayIcon />}
                   sx={{
                     borderColor: 'primary.main',
                     color: 'primary.main',
                     textTransform: 'none',
                     borderRadius: 2,
                     px: 2,
                     py: 1,
                     fontSize: '14px',
                     '&:hover': {
                       borderColor: 'primary.dark',
                       backgroundColor: 'primary.light',
                     }
                   }}
                 >
                   Add to Schedule
                 </Button>
                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                   {/* Rating Display */}
                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                     <StarIcon sx={{ fontSize: 20, color: 'tertiary.main' }} />
                     <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
                       {recipe.rating}
                     </Typography>
                   </Box>
                   <Button
                     variant="outlined"
                     startIcon={<StarIcon />}
                     onClick={() => setRatingDialogOpen(true)}
                     sx={{
                       borderColor: 'tertiary.main',
                       color: 'tertiary.main',
                       textTransform: 'none',
                       borderRadius: 2,
                       px: 2,
                       py: 1,
                       fontSize: '14px',
                       '&:hover': {
                         borderColor: 'tertiary.dark',
                         backgroundColor: 'tertiary.light',
                       }
                     }}
                   >
                     Rate
                   </Button>
                 </Box>
               </Box>
               <Typography variant="h6" gutterBottom sx={{ color: 'text.primary', mb: 2 }}>
                 🥘 Ingredients
               </Typography>
               <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                 {recipe.ingredients.map((ingredient, index) => (
                   <Chip
                     key={index}
                     label={ingredient}
                     sx={{
                       backgroundColor: 'surface.variant',
                       color: 'text.primary',
                       fontWeight: 500,
                       fontSize: '14px',
                       height: '32px',
                       '&:hover': {
                         backgroundColor: 'primary.light',
                         color: 'primary.dark',
                       }
                     }}
                   />
                 ))}
               </Box>
             </Box>

             <Box>
               <Typography variant="h6" gutterBottom sx={{ color: 'text.primary', mb: 2 }}>
                 📋 Method
               </Typography>
               <List>
                 {recipe.method.map((step, index) => (
                   <ListItem key={index} sx={{ px: 0, py: 1, alignItems: 'flex-start' }}>
                     <ListItemText 
                       primary={`${index + 1}. ${step}`}
                       primaryTypographyProps={{ color: 'text.secondary' }}
                     />
                   </ListItem>
                 ))}
               </List>
             </Box>
           </Stack>
         </Container>
      </Box>

      {/* Rating Dialog */}
      <Dialog
        open={ratingDialogOpen}
        onClose={() => setRatingDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <StarIcon sx={{ color: 'tertiary.main' }} />
          Rate this recipe
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 3 }}>
            Rate this recipe
          </DialogContentText>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Rating
              value={userRating || recipe.rating}
              onChange={(_, newValue) => {
                setUserRating(newValue)
              }}
              precision={0.5}
              size="large"
              sx={{
                '& .MuiRating-iconFilled': {
                  color: 'tertiary.main',
                },
                '& .MuiRating-iconEmpty': {
                  color: 'grey.300',
                },
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={() => setRatingDialogOpen(false)}
            sx={{ textTransform: 'none' }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              // Here you would save the rating
              setRatingDialogOpen(false)
            }}
            variant="contained"
            startIcon={<StarIcon />}
            sx={{ textTransform: 'none' }}
          >
            Submit Rating
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
