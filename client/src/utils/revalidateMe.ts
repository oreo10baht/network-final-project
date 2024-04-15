"use client";
import { CheckUser } from "@/models/User";
import { getMe } from "@/services/getMe";
import { getTokenFromCookie } from "@/services/getTokenFromCookie";
import { setTokenInCookie } from "@/services/setTokenInCookie";

export async function revalidateMe(token: string) {
  let tokenCookie = await getTokenFromCookie();
  console.log(tokenCookie, "in my mid");
  if (tokenCookie) {
    //reset cookie
    if (token !== tokenCookie) {
      console.log("token not same");
      if (token === "") {
        // token = tokenCookie;
        console.log("token changed");
      } else {
        tokenCookie = token;
        setTokenInCookie(tokenCookie);
      }
    }
    //get user from token
    const currentUser = await getMe(tokenCookie);
    if (currentUser) {
      //   user = currentUser;
      //   console.log(user, "from my mid");
      const res: CheckUser = {
        user: currentUser,
        token: tokenCookie,
      };
      return res;
    } else {
      //   router.push("/login");
      console.log("fail user");
      return false;
    }
  } else {
    // router.push("/login");
    console.log("fail no token in cookie");
    // setTokenInCookie(token);
    return false;
  }
}
