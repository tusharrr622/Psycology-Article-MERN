import React, { createContext, useContext, useState } from 'react';

const TokenContext = createContext();

const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  // Function to set the token
  const setNewToken = (newToken) => {
    setToken(newToken);
  };

  return (
    <TokenContext.Provider value={{ token, setToken: setNewToken }}>
      {children}
    </TokenContext.Provider>
  );
};

const useToken = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error('useToken must be used within a TokenProvider');
  }
  return context;
};

export { TokenProvider, useToken };
