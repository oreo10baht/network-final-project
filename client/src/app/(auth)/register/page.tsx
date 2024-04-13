"use client";
import { useEffect, useState } from "react";
import { User, UserRegister } from "@/models/User";
import { useRouter } from "next/navigation";
import { register } from "@/services/register";

const Register = () => {
  const [tmpUser, setTmpUser] = useState<UserRegister>({} as UserRegister);
  const router = useRouter();
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTmpUser({
      ...tmpUser,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await register(tmpUser)
    //! connect API here
    console.log(res);
    // router.push("/login");
  };
  return (
    <div className="bg-gray-500 flex flex-col p-6 rounded-xl text-gray-900 font-medium">
      <div className="font-bold large-text text-center">Register</div>
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
            type="text"
            name="password"
            required
            className="flex rounded-lg p-1"
            onChange={handleFormChange}
          ></input>
        </div>
        <div className="my-2">
          <label htmlFor="name" className="small-text">
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            required
            className="flex rounded-lg p-1"
            onChange={handleFormChange}
          ></input>
        </div>
        <div className="my-2">
          <label htmlFor="description" className="small-text">
            Description
          </label>
          <input
            id="description"
            type="text"
            name="description"
            className="flex rounded-lg p-1"
            onChange={handleFormChange}
          ></input>
        </div>
        <div className="my-2">
          <label htmlFor="profileImg" className="small-text">
            Profile Image
          </label>
          <input
            id="profileImg"
            type="file"
            name="profileImg"
            className="flex rounded-lg p-1"
            onChange={handleFormChange}
          ></input>
        </div>

        <div className="w-full flex justify-center">
          <button
            type="submit"
            className="bg-gray-400 py-1 px-2 my-3 mx-auto rounded-lg "
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
