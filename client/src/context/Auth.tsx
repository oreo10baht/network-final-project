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
  // user: MutableRefObject<UserMe | null>;
  user: UserMe | null;
  setUser: Dispatch<SetStateAction<UserMe | null>>;
  token: MutableRefObject<string>;
}

const AuthContext = createContext<AuthContextType>({
  // user: { current: null },
  user: null,
  setUser: (): UserMe | null => null,
  token: { current: "" },
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // const user = useRef<UserMe>(null);
  const [user,setUser] = useState<UserMe | null>(null)

  const token = useRef<string>("");

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
