'use client'

import { useState } from 'react'
import { Box, Container, TextField, Button, Typography, Paper } from '@mui/material'

interface PhoneNumberPageProps {
  onPhoneSubmit: (phone: string) => void
}

export default function PhoneNumberPage({ onPhoneSubmit }: PhoneNumberPageProps) {
  const [phone, setPhone] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (phone.trim()) {
      onPhoneSubmit(phone)
    }
  }

  return (
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      position: 'relative',
      backgroundImage: 'url(https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=1200&fit=crop)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      {/* Dark Overlay for Readability */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 1
        }}
      />
      <Container 
        maxWidth="sm" 
        sx={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center',
          py: 4,
          position: 'relative',
          zIndex: 2
        }}
      >
        <Paper 
          elevation={0}
          sx={{ 
            p: 4, 
            backgroundColor: 'surface.main',
            borderRadius: 3
          }}
        >
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom 
            sx={{ 
              textAlign: 'center',
              color: 'text.primary',
              mb: 2
            }}
          >
            Welcome
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              textAlign: 'center',
              color: 'text.secondary',
              mb: 4
            }}
          >
            Your personal cooking assistant
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Phone Number"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              variant="outlined"
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={!phone.trim()}
              sx={{ mb: 2 }}
            >
              Continue
            </Button>
          </form>

          <Typography 
            variant="caption" 
            sx={{ 
              display: 'block',
              textAlign: 'center',
              color: 'text.secondary',
              mt: 3
            }}
          >
            By continuing, you agree to our Terms of Service
          </Typography>
        </Paper>
      </Container>
    </Box>
  )
}
