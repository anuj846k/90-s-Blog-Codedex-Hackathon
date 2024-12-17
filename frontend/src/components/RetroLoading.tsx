export const RetroLoading = () => {
  return (
    <div className="min-h-[200px] flex flex-col items-center justify-center p-8">
      {/* Loading Container */}
      <div className="relative bg-black/50 p-8 rounded-lg border-2 border-neon-green 
                    animate-border-pulse shadow-[0_0_15px_rgba(57,255,20,0.3)]">
        {/* Terminal-style header */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-neon-red animate-pulse"></div>
          <div className="w-3 h-3 rounded-full bg-neon-yellow animate-pulse delay-75"></div>
          <div className="w-3 h-3 rounded-full bg-neon-green animate-pulse delay-150"></div>
        </div>
        
        {/* Loading Text */}
        <div className="text-neon-green font-mono space-y-2">
          <div className="flex items-center gap-2">
            <span className="animate-pulse"></span>
            <span className="animate-glitch-text">INITIALIZING SERVER</span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-[300px] h-4 bg-black/60 border border-neon-green/50 rounded-full overflow-hidden">
            <div className="h-full bg-neon-green/30 animate-progress-bar relative">
              <div className="absolute top-0 right-0 w-2 h-full bg-neon-green 
                           shadow-[0_0_10px_rgba(57,255,20,0.8)]"></div>
            </div>
          </div>
          
          {/* Loading Messages */}
          <div className="h-32 overflow-hidden">
            <div className="animate-slide-up">
              <p className="text-neon-yellow/80"> Waking up free-tier server...</p>
              <p className="text-neon-blue/80"> This may take up to 30 seconds...</p>
              <p className="text-neon-pink/80"> Running on render.com free tier...</p>
              <p className="text-neon-green/80"> Server spins down after inactivity...</p>
              <p className="text-neon-yellow/80"> Subsequent loads will be faster...</p>
              <p className="text-neon-blue/80"> Please stand by...</p>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-4 p-3 bg-black/40 border border-neon-yellow/30 rounded text-sm text-neon-yellow/70">
          <p className="text-center">
            ℹ️ This blog uses render.com's free tier hosting, which automatically spins down after 15 minutes of inactivity. 
            First load requires a server restart.
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r 
                     from-transparent via-neon-green to-transparent opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r 
                     from-transparent via-neon-green to-transparent opacity-50"></div>
      </div>
    </div>
  );
}; 