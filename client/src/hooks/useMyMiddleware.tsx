"use client";
import { useEffect } from "react";
import { useAuthContext } from "@/context/Auth";
import { getMe } from "@/services/getMe";
import { getTokenFromCookie } from "@/services/getTokenFromCookie";
import { setTokenInCookie } from "@/services/setTokenInCookie";
import { useRouter } from "next/navigation";

export function useMyMiddleware() {
  const router = useRouter();
  const {user, token } = useAuthContext();
  useEffect(() => {
    const getCurrentUser = async () => {
      const tokenCookie = await getTokenFromCookie();
      console.log(tokenCookie,"in my mid")
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
        const currentUser = await getMe(token.current);
        if (currentUser) {
          user.current = currentUser
          console.log(user.current, "from my mid");

        } else {
          router.push("/login");
          console.log("fail user");
        }
      } else {
        router.push("/login");
        console.log("fail no token in cookie");
        // setTokenInCookie(token.current);
      }
    };
    console.log("my mid run")
    getCurrentUser();
  },[]);
}
