export default function WebRing() {
  return (
    <div className="flex justify-center items-center gap-4 bg-neon-purple p-4 rounded-lg border-4 border-neon-yellow">
      <a href="#" className="text-neon-green hover:text-neon-yellow">Previous</a>
      <img src="/placeholder.svg" alt="Web Ring Logo" className="w-12 h-12" />
      <a href="#" className="text-neon-green hover:text-neon-yellow">Next</a>
    </div>
  )
}

