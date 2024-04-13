"use client"
import { useEffect , useState } from "react";
import { User,UserRegister } from "@/models/User";

const Register = () => {

    const handleSubmit = () => {};
    return (
      <div className="bg-gray-500 flex flex-col p-6 rounded-xl text-gray-900 font-medium">
        <div className="font-bold large-text text-center">Register</div>
        <form>
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
            ></input>
          </div>
          <div className="my-2">
            <label htmlFor="password" className="small-text">
              Password
            </label>
            <input
              id="password"
              type="text"
              name="password"
              required
              className="flex rounded-lg p-2"
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

      </div>
    );
}
 
export default Register;