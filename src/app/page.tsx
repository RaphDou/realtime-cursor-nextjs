import CursorTracker from '../components/CursorTracker'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">Multiplayer Cursor Tracker</h1>
      <CursorTracker />
    </main>
  )
}