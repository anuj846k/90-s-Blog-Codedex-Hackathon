'use client'

import { useEffect, useRef } from 'react'

export function SiteHeader() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let offset = 0
    const animate = () => {
      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Create multiple wave layers with different colors
      const colors = [
        'rgba(57, 255, 20, 0.3)',  // neon green
        'rgba(255, 110, 199, 0.2)', // neon pink
        'rgba(0, 255, 255, 0.2)'    // neon cyan
      ]
      
      colors.forEach((color, i) => {
        ctx.beginPath()
        ctx.strokeStyle = color
        ctx.lineWidth = 3
        
        for (let x = 0; x < canvas.width; x++) {
          const frequency = 0.02
          const amplitude = 15
          const y = Math.sin(x * frequency + offset + (i * Math.PI / 4)) * amplitude + 50
          
          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.stroke()
      })
      
      offset += 0.05
      requestAnimationFrame(animate)
    }
    
    animate()
  }, [])

  return (
    <header className="relative w-full h-40 bg-black/90 border-4 border-neon-green rounded-lg overflow-hidden">
      <canvas 
        ref={canvasRef}
        width={1200}
        height={160}
        className="absolute inset-0 w-full h-full"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h1 className="font-['VT323'] text-5xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-green via-neon-blue to-neon-pink animate-pulse">
          90's Blogs
        </h1>
        <div className="flex gap-2 mt-2">
          <span className="px-2 py-1 bg-black/50 text-neon-yellow border border-neon-yellow text-sm animate-blink">
            ONLINE
          </span>
          <span className="px-2 py-1 bg-black/50 text-neon-green border border-neon-green text-sm">
            EST. 2024
          </span>
        </div>
      </div>
    </header>
  )
}

