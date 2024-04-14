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
  user: MutableRefObject<UserMe | null>;
  token: MutableRefObject<string>;
}

const AuthContext = createContext<AuthContextType>({
  user: { current: null },
  token: { current: "" },
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const user = useRef<UserMe>(null);

  const token = useRef<string>("");

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
