import { NextApiResponseServerIO } from '@/types'
import { Server as NetServer } from 'http'
import { NextApiRequest } from 'next'
import { Server as ServerIO, Socket } from 'socket.io'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function GET(req: NextApiRequest, res: NextApiResponseServerIO) {
  if (!res.socket.server.io) {
    console.log('New Socket.io server...')
    const httpServer: NetServer = res.socket.server as any
    const io = new ServerIO(httpServer, {
      path: '/api/socket',
    })
    res.socket.server.io = io

    io.on('connection', (socket: Socket) => {
      console.log('New client connected')

      socket.on('cursor-move', (data: { id: string; x: number; y: number; location: string }) => {
        socket.broadcast.emit('cursor-move', data)
      })

      socket.on('disconnect', () => {
        console.log('Client disconnected')
      })
    })
  }
  res.end()
}