'use client'

import { useState, useRef } from 'react'
import { 
  Box, 
  Button, 
  Typography, 
  Card, 
  CardContent, 
  CircularProgress, 
  Stack, 
  Chip, 
  IconButton,
  Fab
} from '@mui/material'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary'
import CloseIcon from '@mui/icons-material/Close'
import FlashOnIcon from '@mui/icons-material/FlashOn'
import FlashOffIcon from '@mui/icons-material/FlashOff'
import FlipCameraIosIcon from '@mui/icons-material/FlipCameraIos'
import AppBar from './AppBar'
import BottomNav from './BottomNav'

interface ImageToDescriptionPageProps {
  onBack: () => void
  currentNav?: string
  onNavChange?: (value: string) => void
}

const dummyDescriptions = [
  {
    name: 'Classic Spaghetti Carbonara',
    description: 'A traditional Italian pasta dish featuring spaghetti, crispy pancetta, eggs, and parmesan cheese. The creamy sauce is made by combining hot pasta with a mixture of eggs and cheese, creating a rich and flavorful coating without using cream.',
    ingredients: ['Spaghetti', 'Pancetta', 'Eggs', 'Parmesan Cheese', 'Black Pepper'],
    cookingTime: '20 minutes',
    difficulty: 'Medium'
  },
  {
    name: 'Chocolate Layer Cake',
    description: 'A decadent multi-layer chocolate cake with rich frosting. This moist cake features deep chocolate flavor and is perfect for celebrations. The layers are stacked with creamy chocolate frosting between each layer.',
    ingredients: ['Flour', 'Cocoa Powder', 'Sugar', 'Eggs', 'Butter', 'Chocolate'],
    cookingTime: '45 minutes',
    difficulty: 'Easy'
  },
  {
    name: 'Grilled Chicken Salad',
    description: 'A healthy and refreshing salad with tender grilled chicken breast, mixed greens, cherry tomatoes, cucumber, and a light vinaigrette dressing. Perfect for a nutritious meal.',
    ingredients: ['Chicken Breast', 'Mixed Greens', 'Tomatoes', 'Cucumber', 'Olive Oil', 'Lemon'],
    cookingTime: '25 minutes',
    difficulty: 'Easy'
  }
]

export default function ImageToDescriptionPage({ onBack, currentNav = 'image-to-description', onNavChange }: ImageToDescriptionPageProps) {
  const [imageUrl, setImageUrl] = useState('')
  const [description, setDescription] = useState<typeof dummyDescriptions[0] | null>(null)
  const [loading, setLoading] = useState(false)
  const [showCamera, setShowCamera] = useState(true)
  const [flashOn, setFlashOn] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setImageUrl(result)
        setShowCamera(false)
        
        setLoading(true)
        setTimeout(() => {
          const randomDesc = dummyDescriptions[Math.floor(Math.random() * dummyDescriptions.length)]
          setDescription(randomDesc)
          setLoading(false)
        }, 1500)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCaptureClick = () => {
    fileInputRef.current?.click()
  }

  const handleGalleryClick = () => {
    fileInputRef.current?.click()
  }

  const handleReset = () => {
    setImageUrl('')
    setDescription(null)
    setShowCamera(true)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // Camera view
  if (showCamera && !imageUrl) {
    return (
      <Box sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        backgroundColor: '#000',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Camera Viewfinder */}
        <Box sx={{
          flex: 1,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1a1a1a'
        }}>
          {/* Viewfinder Frame */}
          <Box sx={{
            width: '85%',
            aspectRatio: '4/3',
            border: '2px solid rgba(255, 255, 255, 0.8)',
            borderRadius: 2,
            position: 'relative',
            boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '10%',
              left: '10%',
              width: '20px',
              height: '20px',
              borderTop: '3px solid rgba(255, 255, 255, 0.8)',
              borderLeft: '3px solid rgba(255, 255, 255, 0.8)',
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              top: '10%',
              right: '10%',
              width: '20px',
              height: '20px',
              borderTop: '3px solid rgba(255, 255, 255, 0.8)',
              borderRight: '3px solid rgba(255, 255, 255, 0.8)',
            }
          }}>
            {/* Center focus indicator */}
            <Box sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '60%',
              height: '60%',
              border: '1px dashed rgba(255, 255, 255, 0.3)',
              borderRadius: 1
            }} />
          </Box>

          {/* Camera Controls - Top */}
          <Box sx={{
            position: 'absolute',
            top: 16,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'space-between',
            px: 2,
            zIndex: 10
          }}>
            <IconButton
              onClick={onBack}
              sx={{
                color: '#fff',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' }
              }}
            >
              <CloseIcon />
            </IconButton>
            <IconButton
              onClick={() => setFlashOn(!flashOn)}
              sx={{
                color: flashOn ? '#FFD700' : '#fff',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' }
              }}
            >
              {flashOn ? <FlashOnIcon /> : <FlashOffIcon />}
            </IconButton>
          </Box>

          {/* Camera Controls - Side */}
          <Box sx={{
            position: 'absolute',
            right: 16,
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            zIndex: 10
          }}>
            <IconButton
              sx={{
                color: '#fff',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' }
              }}
            >
              <FlipCameraIosIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Bottom Camera Controls */}
        <Box sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: 3,
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center'
        }}>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            capture="environment"
            style={{ display: 'none' }}
          />
          
          <IconButton
            onClick={handleGalleryClick}
            sx={{
              color: '#fff',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' }
            }}
          >
            <PhotoLibraryIcon />
          </IconButton>

          <Fab
            onClick={handleCaptureClick}
            sx={{
              width: 72,
              height: 72,
              backgroundColor: '#fff',
              border: '4px solid rgba(255, 255, 255, 0.3)',
              '&:hover': { backgroundColor: '#f0f0f0' },
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
            }}
          >
            <Box sx={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              backgroundColor: '#fff',
              border: '2px solid #000'
            }} />
          </Fab>

          <Box sx={{ width: 48 }} /> {/* Spacer */}
        </Box>
      </Box>
    )
  }

  // Results view
  return (
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
      backgroundColor: 'background.default',
      pb: 7,
      position: 'relative'
    }}>
      <AppBar title="Recipe Analysis" onBack={handleReset} showBack={true} />
      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        {/* Image Preview */}
        {imageUrl && (
          <Box sx={{
            width: '100%',
            position: 'relative',
            backgroundColor: '#000'
          }}>
            <Box
              component="img"
              src={imageUrl}
              alt="Captured recipe"
              sx={{
                width: '100%',
                height: 'auto',
                display: 'block',
                maxHeight: '400px',
                objectFit: 'contain'
              }}
            />
          </Box>
        )}

        {loading && (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <CircularProgress sx={{ mb: 2 }} />
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Analyzing image...
            </Typography>
          </Box>
        )}

        {description && !loading && (
          <Card elevation={0} sx={{ m: 2, backgroundColor: 'surface.main' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ color: 'text.primary', mb: 2 }}>
                {description.name}
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.6 }}>
                {description.description}
              </Typography>
              <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                <Chip label={`⏱️ ${description.cookingTime}`} size="small" />
                <Chip label={`📊 ${description.difficulty}`} size="small" />
              </Stack>
              <Typography variant="subtitle2" sx={{ color: 'text.primary', mb: 1 }}>
                Key Ingredients:
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {description.ingredients.map((ing, i) => (
                  <Chip
                    key={i}
                    label={ing}
                    size="small"
                    sx={{
                      backgroundColor: 'primary.light',
                      color: 'primary.dark',
                    }}
                  />
                ))}
              </Stack>
            </CardContent>
          </Card>
        )}
      </Box>
      <BottomNav value={currentNav} onChange={onNavChange || (() => {})} />
    </Box>
  )
}
