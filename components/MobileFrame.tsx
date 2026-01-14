'use client'

import { ReactNode } from 'react'

interface MobileFrameProps {
  children: ReactNode
}

export default function MobileFrame({ children }: MobileFrameProps) {
  return (
    <div style={{
      width: '375px',
      height: '812px',
      backgroundColor: '#000',
      borderRadius: '40px',
      padding: '8px',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Notch */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '150px',
        height: '25px',
        backgroundColor: '#000',
        borderRadius: '0 0 20px 20px',
        zIndex: 10
      }} />
      
      {/* Screen */}
      <div style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#f5f5f5',
        borderRadius: '32px',
        overflow: 'hidden',
        position: 'relative'
      }}>
        {children}
      </div>
    </div>
  )
}
