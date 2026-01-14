'use client'

import { useState, useRef } from 'react'
import { Box, Container, TextField, Button, Typography, Paper, Stack } from '@mui/material'

interface OTPPageProps {
  phoneNumber: string
  onVerify: () => void
}

export default function OTPPage({ phoneNumber, onVerify }: OTPPageProps) {
  const [otp, setOtp] = useState(['', '', '', ''])
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = inputRefs.current[index + 1]
      if (nextInput) nextInput.focus()
    }

    // Auto-verify if all fields filled
    if (newOtp.every(digit => digit !== '') && newOtp.join('').length === 4) {
      setTimeout(() => onVerify(), 500)
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = inputRefs.current[index - 1]
      if (prevInput) prevInput.focus()
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
            variant="h6" 
            component="h2" 
            gutterBottom 
            sx={{ 
              textAlign: 'center',
              color: 'text.primary',
              mb: 1
            }}
          >
            Enter Verification Code
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              textAlign: 'center',
              color: 'text.secondary',
              mb: 4
            }}
          >
            We sent a code to {phoneNumber}
          </Typography>

          <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 4 }}>
            {otp.map((digit, index) => (
              <TextField
                key={index}
                inputRef={(el) => {
                  inputRefs.current[index] = el
                }}
                type="text"
                inputMode="numeric"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                inputProps={{
                  maxLength: 1,
                  style: { textAlign: 'center', fontSize: '24px', fontWeight: 600 }
                }}
                sx={{
                  width: '56px',
                  '& .MuiOutlinedInput-root': {
                    height: '64px',
                  }
                }}
              />
            ))}
          </Stack>

          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={onVerify}
            disabled={otp.some(digit => !digit)}
            sx={{ mb: 2 }}
          >
            Verify
          </Button>

          <Button
            fullWidth
            variant="text"
            onClick={() => {
              setOtp(['', '', '', ''])
            }}
            sx={{ color: 'primary.main' }}
          >
            Resend OTP
          </Button>
        </Paper>
      </Container>
    </Box>
  )
}
