'use client'

import { useEffect, useState } from 'react'

export default function SpaceBackground() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 overflow-hidden bg-black">
      {/* Base space layer - slowest moving */}
      <div 
        className="absolute inset-0 animate-space-scroll-slow"
        style={{
          backgroundImage: `url('/space.png')`,
          backgroundRepeat: 'repeat',
        }}
      />
      
      {/* Middle stars layer - medium speed */}
      <div 
        className="absolute inset-0 animate-space-scroll-medium"
        style={{
          backgroundImage: `url('/stars2.png')`,
          backgroundRepeat: 'repeat',
        }}
      />
      
      {/* Top stars layer - fastest moving */}
      <div 
        className="absolute inset-0 animate-space-scroll-fast"
        style={{
          backgroundImage: `url('/stars.png')`,
          backgroundRepeat: 'repeat',
        }}
      />
    </div>
  )
}

