
import { useState, useRef } from 'react'
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react'

export function RetroMediaPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
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

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const skip = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime += seconds
    }
  }

  return (
    <div className=" p-6 rounded-lg border-4 border-green-500 shadow-[0_0_10px_#39ff14] max-w-md mx-auto font-mono">
      <h2 className="text-green-500 font-bold mb-4 text-center text-2xl animate-pulse">Retro Media Player</h2>
      
      <div className="space-y-4">
        <audio ref={audioRef} src="/rt.mp3" className="w-full" controls />

        <div className="flex justify-between items-center text-green-500">
          <button onClick={() => skip(-10)} className="hover:text-blue-400 transition-colors">
            <SkipBack size={24} />
          </button>
          <button onClick={togglePlay} className="hover:text-blue-400 transition-colors">
            {isPlaying ? <Pause size={32} /> : <Play size={32} />}
          </button>
          <button onClick={() => skip(10)} className="hover:text-blue-400 transition-colors">
            <SkipForward size={24} />
          </button>
        </div>

        <div className="flex items-center space-x-2 text-green-500">
          <button onClick={toggleMute} className="hover:text-blue-400 transition-colors">
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
        </div>
      </div>
    </div>
  )
}

