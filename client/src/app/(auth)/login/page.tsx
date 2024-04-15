"use client";
import Link from "next/link";
import { useState } from "react";
import { UserLogin, User } from "@/models/User";
import { useRouter } from "next/navigation";
import { login } from "@/services/login";
import { useAuthContext } from "@/context/Auth";
import { io } from "socket.io-client";

const socket = io(`${process.env.backend}`);

const Login = () => {
  const [tmpUser, setTmpUser] = useState<UserLogin>({} as UserLogin);
  const { token } = useAuthContext();

  const router = useRouter();

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTmpUser({
      ...tmpUser,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await login(tmpUser);
    if (res) {
      console.log(res);
      token.current = res.token;
      console.log(token.current);
      router.push("/home/all");
    }
  };
  return (
    <div className="bg-gray-500 flex flex-col p-6 rounded-xl text-gray-900 font-medium">
      <div className="font-bold large-text text-center">Login</div>
      <form onSubmit={handleSubmit}>
        <div className="my-2">
          <label htmlFor="username" className="small-text">
            Username
          </label>
          <input
            id="username"
            type="text"
            name="username"
            required
            className="flex rounded-lg p-1"
            onChange={handleFormChange}
          ></input>
        </div>
        <div className="my-2">
          <label htmlFor="password" className="small-text">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            required
            className="flex rounded-lg p-1"
            onChange={handleFormChange}
          ></input>
        </div>
        <div className="w-full flex justify-center">
          <button
            type="submit"
            className="bg-gray-400 py-1 px-2 my-3 mx-auto rounded-lg "
          >
            Login
          </button>
        </div>
      </form>
      <p>
        No account yet?{" "}
        <Link href={"/register"} className="hover:text-gray-100">
          Register here
        </Link>
      </p>
    </div>
  );
};

export default Login;
