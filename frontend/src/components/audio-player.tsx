'use client'

import { useState, useRef } from 'react'
import { Play, Pause, Volume2 } from 'lucide-react'

export function AudioPlayer({ src, title }: { src: string; title: string }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div className="flex items-center space-x-2 bg-black p-2 rounded border border-neon-blue animate-border-pulse">
      <button
        onClick={togglePlay}
        className="p-1 hover:bg-neon-blue/20 rounded"
      >
        {isPlaying ? <Pause size={16} className="text-neon-blue" /> : <Play size={16} className="text-neon-blue" />}
      </button>
      <div className="text-sm text-neon-blue">{title}</div>
      <Volume2 size={16} className="text-neon-blue" />
      <audio ref={audioRef} src={src} />
    </div>
  )
}

