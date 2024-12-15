
export function ContentGrid() {
  const retroGames = [
    { name: "Cat Invaders", img: "r1.gif" },
    { name: "Anime", img: "/r2.gif" },
    { name: "Gaming", img: "/r3.gif" },
    { name: "Music", img: "/r4.gif" },
    { name: "Photography", img: "/r5.gif" },
    { name: "Programming", img: "/r6.gif" },
    
  ]

  return (
    <div className="bg-black/50 p-4 rounded border border-neon-green">
      <h2 className="text-neon-green font-bold mb-2 animate-flicker"> Hope you enjoy these</h2>
      <div className="grid grid-cols-3 gap-2">
        {retroGames.map((game, i) => (
          <div key={i} className="bg-neon-purple/20 rounded overflow-hidden">
            <img
              src={game.img}
              alt={game.name}
              width={100}
              height={100}
              className="w-full h-auto pixelated"
            />
            <p className="text-center text-neon-yellow text-xs mt-1">{game.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

