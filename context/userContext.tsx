import { cookies } from "next/dist/client/components/headers";
import React, { createContext, useEffect, useMemo, useState } from "react";
import { Cookies, useCookies } from "react-cookie";
import { FunctionDeclaration, FunctionExpression } from "typescript";

export type User = {
  username: string;
  is_admin: boolean;
};

export type UserContextType = {
  user: any;
  setUser: any;
};

type UserContextProviderType = {
  children: React.ReactNode;
};

export const UserContext = createContext({} as UserContextType);

export const UserContextProvider = ({ children }: UserContextProviderType) => {
  const [user, setUser] = useState<User | null>(null);

  // setting context from local storage
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") as any);

    if (userData) {
      setUser(userData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
