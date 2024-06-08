import { createContext, useContext, useMemo } from 'react';
import io from 'socket.io-client';
import { server } from './components/constants/config';

const SocketContext = createContext();
const getSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
    const socket = useMemo(() => io(server, { withCredentials: true }), [])

    return (
        <SocketContext.Provider value = {socket}>
            {children}
        </SocketContext.Provider>
    )
}

export { getSocket, SocketProvider };

// SocketProvider fn when passed to a function creates wrapping of the function with Provider tag so that they
// can access the socket using value
// using useMemo helps in caching the socket so that we don't create it again and again