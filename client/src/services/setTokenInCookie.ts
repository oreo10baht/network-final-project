"use server";
import { cookies } from "next/headers";
export async function setTokenInCookie(newToken: string) {
  try {
    const cookieStore = cookies();
    const tokenCookie = cookieStore.get("token");
    if (tokenCookie === undefined) {
      throw new Error("no token in cookie");
    }
    cookieStore.set("token", newToken);
    console.log("token in cookie reseted");
  } catch (err) {
    console.log(err);
  }
}
