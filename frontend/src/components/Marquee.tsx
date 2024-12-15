export default function Marquee({ text }: { text: string }) {
  return (
    <div className="overflow-hidden bg-neon-yellow text-neon-green font-bold py-1">
      <div className="animate-marquee whitespace-nowrap">
        {text.repeat(10)}
      </div>
    </div>
  )
}

