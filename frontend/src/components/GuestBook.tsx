import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function GuestBook() {
  const [entries, setEntries] = useState<string[]>([])
  const [newEntry, setNewEntry] = useState('')

  const addEntry = () => {
    if (newEntry.trim()) {
      setEntries([...entries, newEntry])
      setNewEntry('')
    }
  }

  return (
    <div className="bg-black/50 p-4 rounded-lg border-4 border-neon-pink">
      <h2 className="text-2xl font-bold mb-4 text-neon-green">Guestbook</h2>
      <div className="mb-4">
        <Input
          type="text"
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
          placeholder="Leave your mark!"
          className="bg-black/50 text-neon-green border-neon-blue mb-2"
        />
        <Button onClick={addEntry} className="bg-neon-pink text-black hover:bg-neon-purple">
          Sign Guestbook
        </Button>
      </div>
      <div className="bg-black/70 text-neon-green p-2 rounded max-h-40 overflow-y-auto">
        {entries.map((entry, index) => (
          <p key={index} className="mb-1">
            {entry}
          </p>
        ))}
      </div>
    </div>
  )
}