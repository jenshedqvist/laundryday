import React from 'react';

type UserContexProps = {
  isAuthenticated: boolean;
  setIsAuthenticated: (isSet: boolean) => void;
};

const initialState = {
  isAuthenticated: false,
};

export const UserContext = React.createContext({} as UserContexProps);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(
    initialState.isAuthenticated
  );

  return (
    <UserContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
};
