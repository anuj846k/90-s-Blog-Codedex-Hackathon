

const socialLinks = [
  { name: 'YouTube', gif: '/b1.gif' },
  { name: 'Email', gif: '/b2.gif' },
  { name: 'Music', gif: '/b3.gif' },
  { name: 'Gaming', gif: '/b4.gif' },
  { name: 'Photography', gif: '/b5.gif' },
];

export function SocialLinks() {
  return (
    <div className="bg-black/50 p-4 rounded border border-neon-yellow">
      <h2 className="text-neon-green font-bold mb-2 animate-flicker">Cool GIFs</h2>
      <div className="">
        {socialLinks.map((link) => (
          <SocialGif key={link.name} name={link.name} gif={link.gif} />
        ))}
      </div>
    </div>
  )
}

function SocialGif({ name, gif }: { name: string, gif: string }) {
  return (
    <div className="my-3">
      <img
        src={gif}
        alt={`${name} GIF`}
        className="w-full object-contain"
      />
    </div>
  )
}

