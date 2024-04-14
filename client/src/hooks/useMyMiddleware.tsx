"use client";
import { useEffect } from "react";
import { useAuthContext } from "@/context/Auth";
import { getMe } from "@/services/getMe";
import { getTokenFromCookie } from "@/services/getTokenFromCookie";
import { setTokenInCookie } from "@/services/setTokenInCookie";
import { useRouter } from "next/navigation";

export function useMyMiddleware() {
  const router = useRouter();
  const { token, setUser } = useAuthContext();
  useEffect(() => {
    const getCurrentUser = async () => {
      const tokenCookie = await getTokenFromCookie();
      if (tokenCookie) {
        if (token.current !== tokenCookie) {
          console.log("token not same");
          if (token.current === "") {
            token.current = tokenCookie;
            console.log("token changed");
          } else {
            setTokenInCookie(token.current);
          }
        }
        const user = await getMe(token.current);
        if (user) {
          console.log(user, "from 2nd layout");
          setUser(user);
        } else {
          router.push("/login");
          console.log("fail user");
        }
      } else {
        router.push("/login");
        console.log("fail no token in cookie");
      }
    };
    getCurrentUser();
  }, []);
}
