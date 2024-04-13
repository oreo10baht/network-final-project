"use client";
import {
  useState,
  useRef,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  MutableRefObject,
} from "react";
import React from "react";
import { UserMe } from "@/models/User";

interface AuthContextType {
  user: UserMe | null;
  setUser: Dispatch<SetStateAction<UserMe | null>>;
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: (): UserMe | null => null,
  token: null,
  setToken: (): string | null => null,
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<UserMe | null>(null);
  const [token, setToken] = useState<string | null>(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
