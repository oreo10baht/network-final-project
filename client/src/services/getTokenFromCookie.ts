"use server";
import { cookies } from "next/headers";
export async function getTokenFromCookie() {
  try {
    const cookieStore = cookies();
    const tokenCookie = cookieStore.get("token");
    if (tokenCookie === undefined) {
      throw new Error("no token in cookie");
    }
    console.log(tokenCookie, "test token");
    return tokenCookie.value;
  } catch (err) {
    console.log(err);
  }
}
