import { useState, useEffect } from 'react'

const retroButtons = [
  { src: "z1.png", alt: "Retro Web Button", href: "#" },
  { src: "z2.gif", alt: "88x31 Button", href: "#" },
  { src: "z3.gif", alt: "Web Badge", href: "#" },
  { src: "z4.gif", alt: "Retro Badge", href: "#" },
  { src: "z5.gif", alt: "Web Button", href: "#" },
  { src: "z6.gif", alt: "Pixel Button", href: "#" },
  { src: "z7.jpeg", alt: "HTML Button", href: "#" },
  { src: "z8.gif", alt: "Design Button", href: "#" },
]

export function Footer() {
  const [colorIndex, setColorIndex] = useState(0)
  const colors = ['text-green-400', 'text-blue-400', 'text-purple-400', 'text-yellow-400', 'text-red-400']

  useEffect(() => {
    const colorInterval = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 1) % colors.length)
    }, 2000)

    return () => clearInterval(colorInterval)
  }, [])

  return (
    <footer className="mt-12 border-t-2 border-neon-green  font-['VT323'] tracking-wider text-green-400 relative overflow-hidden">
    
      <div className="text-center text-neon-green opacity-70 overflow-hidden whitespace-nowrap py-2">
      <pre className="inline-block text-xs animate-marquee">
        {`
         ___     __    _____  _     _  _____    _____  _____  ____  _____ __   _  _____ 
        |   |   |  |  |     || |   | ||     |  |     ||     ||    ||     |  \\ | ||     |
        |   |   |  |  |    _|| |   | ||    _|  |     ||     ||    ||     |   \\| ||    _|
        |___|   |__|  |_____| \\_____/ |_____|  |_____||_____||____||_____|__|\\__||_____|
        `}
      </pre>
        </div>

      <div className="relative z-10 py-4 px-2 overflow-x-auto">
        <div className="flex justify-center items-center space-x-2 min-w-max mx-auto">
          {retroButtons.map((button, index) => (
            <a
              key={index}
              href={button.href}
              className="block transform hover:scale-110 transition-transform duration-200 hover:shadow-[0_0_8px_rgba(0,255,0,0.5)]"
            >
              <img
                src={button.src}
                alt={button.alt}
                className="w-[88px] h-[31px] pixelated"
                style={{
                  imageRendering: 'pixelated',
                  backgroundColor: 'transparent'
                }}
              />
            </a>
          ))}
        </div>
      </div>

      <nav className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 max-w-4xl mx-auto text-center relative z-10">
        <a 
          href="https://www.anuj846k.tech/" 
          target='_blank'
          className={`
            ${colors[colorIndex]}
            transition-all 
            duration-300 
            hover:shadow-[0_0_8px_rgba(0,255,0,0.5)] 
            px-4 
            py-2
            animate-pulse
          `}
        >
          [Portfolio]
        </a>
        <a 
          href="https://www.linkedin.com/in/anuj-kumar-6aa13b264/" 
          target='_blank'
          className={`
            ${colors[(colorIndex + 1) % colors.length]}
            transition-all 
            duration-300 
            hover:shadow-[0_0_8px_rgba(0,255,0,0.5)] 
            px-4 
            py-2
            animate-pulse
          `}
        >
          [LinkedIn]
        </a>
        <a 
          href="https://x.com/anuj846kk" 
          target='_blank'
          className={`
            ${colors[(colorIndex + 2) % colors.length]}
            transition-all 
            duration-300 
            hover:shadow-[0_0_8px_rgba(0,255,0,0.5)] 
            px-4 
            py-2
            animate-pulse
          `}
        >
          [Twitter]
        </a>
        <a 
          href="https://github.com/anuj846k"
          target='_blank' 
          className={`
            ${colors[(colorIndex + 3) % colors.length]}
            transition-all 
            duration-300 
            hover:shadow-[0_0_8px_rgba(0,255,0,0.5)] 
            px-4 
            py-2
            animate-pulse
          `}
        >
          [Github]
        </a>
      </nav>

      <div className="text-center pb-6 relative z-10">
        <p className="mb-2 text-sm animate-blink">
          {'</>'}  MADE WITH NEON PIXELS AND NOSTALGIA  {'</>'}
        </p>
        <p className="text-xs opacity-70">
          ©90's Blogs 2024 .NET - ALL RIGHTS RESERVED
        </p>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="h-px bg-green-600/20 animate-scan-fast"></div>
        <div className="h-px bg-blue-600/20 animate-scan-slow"></div>
      </div>
    </footer>
  )
}

