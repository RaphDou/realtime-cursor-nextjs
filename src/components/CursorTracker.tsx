'use client'

import { useEffect, useState } from 'react'
import useWebSocket from '../lib/useWebSocket'
import useGeolocation from '../lib/useGeolocation'

type Cursor = {
  id: string
  x: number
  y: number
  location: string
}

export default function CursorTracker() {
  const [cursors, setCursors] = useState<Cursor[]>([])
  const socket = useWebSocket()
  const location = useGeolocation()

  useEffect(() => {
    if (!socket) return

    const handleCursorMove = (data: Cursor) => {
      setCursors(prevCursors => {
        const newCursors = prevCursors.filter(c => c.id !== data.id)
        return [...newCursors, data]
      })
    }

    socket.on('cursor-move', handleCursorMove)

    return () => {
      socket.off('cursor-move', handleCursorMove)
    }
  }, [socket])

  useEffect(() => {
    if (!socket) return

    const handleMouseMove = (event: MouseEvent) => {
      const cursor: Cursor = {
        id: socket.id || 'unknown-' + Math.random().toString(36).substring(2, 9),
        x: event.clientX,
        y: event.clientY,
        location: location
      }
      socket.emit('cursor-move', cursor)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [socket, location])

  return (
    <div className="relative w-full h-full">
      {cursors.map(cursor => (
        <div
          key={cursor.id}
          className="absolute w-4 h-4 bg-red-500 rounded-full"
          style={{ left: cursor.x, top: cursor.y }}
          title={`Location: ${cursor.location}`}
        />
      ))}
    </div>
  )
}