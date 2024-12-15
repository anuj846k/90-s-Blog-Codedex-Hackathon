import { useState, useRef, useEffect } from 'react'
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react'

export function RetroMediaPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener('timeupdate', updateProgress);
      audio.addEventListener('loadedmetadata', () => {
        setDuration(audio.duration);
      });
    }
    return () => {
      if (audio) {
        audio.removeEventListener('timeupdate', updateProgress);
      }
    }
  }, []);

  const updateProgress = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

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

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = e.currentTarget;
    const clickPosition = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.offsetWidth;
    if (audioRef.current) {
      audioRef.current.currentTime = clickPosition * duration;
    }
  }

  return (
    <div className="bg-black/90 p-6 rounded-lg border-4 border-neon-green shadow-[0_0_20px_rgba(57,255,20,0.5)] 
                    max-w-md mx-auto font-['VT323'] relative overflow-hidden">
      {/* Retro Display Screen */}
      <div className="bg-black/80 p-4 rounded-md border-2 border-neon-green mb-4 relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(transparent_50%,rgba(57,255,20,0.1)_50%)] bg-[length:100%_4px]"></div>
        <h2 className="text-neon-green font-bold text-center text-2xl mb-2 animate-pulse">
          Retro Media Player
        </h2>
        <div className="text-neon-green text-center text-sm">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>

      {/* Hidden native audio element */}
      <audio ref={audioRef} src="/rt.mp3" className="hidden" />

      {/* Custom Progress Bar */}
      <div 
        className="h-4 bg-black/60 border border-neon-green/50 rounded-full mb-4 cursor-pointer relative overflow-hidden"
        onClick={handleProgressClick}
      >
        <div 
          className="h-full bg-neon-green/30 relative"
          style={{ width: `${(currentTime / duration) * 100}%` }}
        >
          <div className="absolute top-0 right-0 w-2 h-full bg-neon-green shadow-[0_0_10px_rgba(57,255,20,0.8)]"></div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="bg-black/60 p-4 rounded-lg border border-neon-green/30">
        {/* Main Controls */}
        <div className="flex justify-between items-center mb-4">
          <button 
            onClick={() => skip(-10)} 
            className="p-2 hover:bg-neon-green/20 rounded-full transition-all duration-300 text-neon-green
                     hover:shadow-[0_0_10px_rgba(57,255,20,0.5)]"
          >
            <SkipBack size={24} />
          </button>
          
          <button 
            onClick={togglePlay} 
            className="p-4 bg-neon-green/20 rounded-full hover:bg-neon-green/30 transition-all duration-300
                     border border-neon-green shadow-[0_0_15px_rgba(57,255,20,0.3)]
                     hover:shadow-[0_0_20px_rgba(57,255,20,0.5)]"
          >
            {isPlaying ? 
              <Pause size={32} className="text-neon-green" /> : 
              <Play size={32} className="text-neon-green" />
            }
          </button>
          
          <button 
            onClick={() => skip(10)} 
            className="p-2 hover:bg-neon-green/20 rounded-full transition-all duration-300 text-neon-green
                     hover:shadow-[0_0_10px_rgba(57,255,20,0.5)]"
          >
            <SkipForward size={24} />
          </button>
        </div>

        {/* Volume Control */}
        <div className="flex justify-center">
          <button 
            onClick={toggleMute} 
            className="p-2 hover:bg-neon-green/20 rounded-full transition-all duration-300 text-neon-green
                     hover:shadow-[0_0_10px_rgba(57,255,20,0.5)]"
          >
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-2 right-2 w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
      <div className="absolute top-2 left-2 w-2 h-2 bg-neon-red rounded-full animate-pulse"></div>
    </div>
  )
}

