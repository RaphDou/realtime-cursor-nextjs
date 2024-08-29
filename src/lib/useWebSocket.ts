import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

const useWebSocket = (): Socket | null => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io('/api/socket');
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return socket;
};

export default useWebSocket;