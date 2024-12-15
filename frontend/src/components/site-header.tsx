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
      
      for (let i = 0; i < 5; i++) {
        ctx.beginPath()
        ctx.strokeStyle = `rgba(57, 255, 20, ${0.2 + i * 0.1})`
        ctx.lineWidth = 2
        
        for (let x = 0; x < canvas.width; x++) {
          const y = Math.sin(x * 0.02 + offset + i) * 10 + 50
          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.stroke()
      }
      
      offset += 0.05
      requestAnimationFrame(animate)
    }
    
    animate()
  }, [])

  return (
    <header className="relative w-full h-32 bg-black">
      <canvas 
        ref={canvasRef}
        width={1200}
        height={128}
        className="absolute inset-0 w-full h-full"
      />
      <h1 className="absolute inset-0 font-['VT323'] flex items-center justify-center text-8xl font-bold text-neon-green animate-pulse" style={{
        textShadow: '0 0 10px rgba(57, 255, 20, 0.8), 0 0 20px rgba(57, 255, 20, 0.8), 0 0 30px rgba(57, 255, 20, 0.8)'
      }}>
        90's Blogs
      </h1>
    </header>
  )
}

