import React, { useContext, createContext } from 'react';

const SocketApiContext = createContext<any>({});
export const useSocketApi = () => useContext(SocketApiContext);

interface Props {
  socket: any,
  children: React.ReactNode,
}

const SocketApiProvider: React.FC<Props> = ({ socket, children }) => (
  <SocketApiContext.Provider
    value={socket}
  >
    { children }
  </SocketApiContext.Provider>
);

export default SocketApiProvider;
