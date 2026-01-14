'use client'

import { useState } from 'react'
import { Box, Container, Typography, TextField, Button, Stack, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import ShareIcon from '@mui/icons-material/Share'
import AppBar from './AppBar'

interface CreateRecipePageProps {
  onBack: () => void
  currentNav?: string
  onNavChange?: (value: string) => void
}

export default function CreateRecipePage({ onBack, currentNav = 'create-recipe', onNavChange }: CreateRecipePageProps) {
  const [recipeName, setRecipeName] = useState('')
  const [recipeImage, setRecipeImage] = useState<string | null>(null)
  const [ingredients, setIngredients] = useState<string[]>([''])
  const [methods, setMethods] = useState<string[]>([''])
  const [showShareDialog, setShowShareDialog] = useState(false)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setRecipeImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddIngredient = () => {
    setIngredients([...ingredients, ''])
  }

  const handleRemoveIngredient = (index: number) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, i) => i !== index))
    }
  }

  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...ingredients]
    newIngredients[index] = value
    setIngredients(newIngredients)
  }

  const handleAddMethod = () => {
    setMethods([...methods, ''])
  }

  const handleRemoveMethod = (index: number) => {
    if (methods.length > 1) {
      setMethods(methods.filter((_, i) => i !== index))
    }
  }

  const handleMethodChange = (index: number, value: string) => {
    const newMethods = [...methods]
    newMethods[index] = value
    setMethods(newMethods)
  }

  const handleSubmit = () => {
    // Show share dialog instead of directly saving
    setShowShareDialog(true)
  }

  const handleShareConfirm = (share: boolean) => {
    // Here you would typically save the recipe with share preference
    console.log('Recipe:', {
      name: recipeName,
      image: recipeImage,
      ingredients: ingredients.filter(i => i.trim() !== ''),
      methods: methods.filter(m => m.trim() !== ''),
      shared: share
    })
    setShowShareDialog(false)
    // Navigate back after saving
    onBack()
  }

  const handleShareCancel = () => {
    setShowShareDialog(false)
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
      <AppBar title="Create Recipe" onBack={onBack} showBack={true} />
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
        <Stack spacing={3}>
          {/* Recipe Image */}
          <Box>
            <Typography variant="body1" sx={{ mb: 1, color: 'text.primary', fontWeight: 500 }}>
              Recipe Image
            </Typography>
            <Box
              sx={{
                width: '100%',
                height: 200,
                border: '2px dashed',
                borderColor: 'divider',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'surface.main',
                overflow: 'hidden',
                position: 'relative',
                cursor: 'pointer',
                '&:hover': {
                  borderColor: 'primary.main',
                }
              }}
            >
              {recipeImage ? (
                <>
                  <Box
                    component="img"
                    src={recipeImage}
                    alt="Recipe preview"
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  <IconButton
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      color: '#fff',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                      }
                    }}
                    onClick={() => setRecipeImage(null)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              ) : (
                <Box sx={{ textAlign: 'center' }}>
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="recipe-image-upload"
                    type="file"
                    onChange={handleImageChange}
                  />
                  <label htmlFor="recipe-image-upload">
                    <Button
                      component="span"
                      variant="outlined"
                      sx={{ textTransform: 'none' }}
                    >
                      Upload Image
                    </Button>
                  </label>
                </Box>
              )}
            </Box>
          </Box>

          {/* Recipe Name */}
          <TextField
            fullWidth
            label="Recipe Name"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            variant="outlined"
            required
          />

          {/* Ingredients */}
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 500 }}>
                Ingredients
              </Typography>
              <Button
                startIcon={<AddIcon />}
                onClick={handleAddIngredient}
                size="small"
                sx={{ textTransform: 'none' }}
              >
                Add
              </Button>
            </Box>
            <Stack spacing={1}>
              {ingredients.map((ingredient, index) => (
                <Box key={index} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <TextField
                    fullWidth
                    placeholder={`Ingredient ${index + 1}`}
                    value={ingredient}
                    onChange={(e) => handleIngredientChange(index, e.target.value)}
                    variant="outlined"
                    size="small"
                  />
                  {ingredients.length > 1 && (
                    <IconButton
                      onClick={() => handleRemoveIngredient(index)}
                      color="error"
                      size="small"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  )}
                </Box>
              ))}
            </Stack>
          </Box>

          {/* Method */}
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 500 }}>
                Method
              </Typography>
              <Button
                startIcon={<AddIcon />}
                onClick={handleAddMethod}
                size="small"
                sx={{ textTransform: 'none' }}
              >
                Add Step
              </Button>
            </Box>
            <Stack spacing={1}>
              {methods.map((method, index) => (
                <Box key={index} sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                  <TextField
                    fullWidth
                    placeholder={`Step ${index + 1}`}
                    value={method}
                    onChange={(e) => handleMethodChange(index, e.target.value)}
                    variant="outlined"
                    size="small"
                    multiline
                    rows={2}
                  />
                  {methods.length > 1 && (
                    <IconButton
                      onClick={() => handleRemoveMethod(index)}
                      color="error"
                      size="small"
                      sx={{ mt: 0.5 }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  )}
                </Box>
              ))}
            </Stack>
          </Box>

          {/* Submit Button */}
          <Button
            variant="contained"
            fullWidth
            onClick={handleSubmit}
            disabled={!recipeName.trim()}
            sx={{ mt: 2, textTransform: 'none' }}
          >
            Create Recipe
          </Button>
        </Stack>
      </Container>

      {/* Share Dialog */}
      <Dialog
        open={showShareDialog}
        onClose={handleShareCancel}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ShareIcon sx={{ color: 'primary.main' }} />
          Share Recipe?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Would you like to share this recipe with other users? Shared recipes will be visible to everyone in the community.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={handleShareCancel}
            sx={{ textTransform: 'none' }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleShareConfirm(false)}
            variant="outlined"
            sx={{ textTransform: 'none' }}
          >
            Keep Private
          </Button>
          <Button
            onClick={() => handleShareConfirm(true)}
            variant="contained"
            startIcon={<ShareIcon />}
            sx={{ textTransform: 'none' }}
          >
            Share Recipe
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
