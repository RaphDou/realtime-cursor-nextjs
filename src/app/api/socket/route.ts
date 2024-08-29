import { NextRequest, NextResponse } from 'next/server';
import { Server as SocketIOServer } from 'socket.io';
import { createServer } from 'http';

export const dynamic = 'force-dynamic';

let io: SocketIOServer | null = null;

function initSocketIO() {
  if (!io) {
    const httpServer = createServer();
    io = new SocketIOServer(httpServer, {
      path: '/api/socket',
      addTrailingSlash: false,
    });

    io.on('connection', (socket) => {
      console.log('New client connected');

      socket.on('cursor-move', (data: { id: string; x: number; y: number; location: string }) => {
        socket.broadcast.emit('cursor-move', data);
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });

    httpServer.listen(3001, () => {
      console.log('Socket.IO server running on port 3001');
    });
  }
  return io;
}

export async function GET(req: NextRequest) {
  const socketServer = initSocketIO();
  return NextResponse.json({ message: 'Socket server is running' });
}