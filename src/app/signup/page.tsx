"use client";
import React from "react";
import { useRouter } from 'next/navigation';
import { FcGoogle } from "react-icons/fc";
import { ImFacebook2 } from "react-icons/im";
import { FaSquareXTwitter } from "react-icons/fa6";
import { BsEyeSlashFill } from "react-icons/bs";

export default function Login() {
  const router = useRouter();

  return (
    <div
      className="h-screen w-screen flex items-center justify-center"
      style={{
        backgroundImage: `url('/login_background.jpeg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-4xl bg-black bg-opacity-50 rounded-lg flex shadow-lg overflow-hidden">
        <div className="w-1/2 bg-gray-100 flex flex-col justify-center items-center p-10">
          <h2 className="text-3xl font-bold text-gray-800">One Of Us ?</h2>
          <p className="mt-2 text-gray-600">Just Sign In </p>
          <button className="mt-6 bg-white text-gray-800 py-2 px-6 rounded-lg font-bold shadow-md" onClick={() => router.push("/login")}>
            Sign In
          </button>
        </div>
        <div className="w-1/2 p-10">
          <h2 className="text-3xl font-bold text-white">Sign Up</h2>
          <form className="mt-6">
            <label className="block text-gray-300">User Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 mt-2 bg-transparent border-b-2 border-gray-400 text-white focus:outline-none"
            />

            <label className="block mt-4 text-gray-300">Email Address</label>
            <input
              type="text"
              className="w-full px-4 py-2 mt-2 bg-transparent border-b-2 border-gray-400 text-white focus:outline-none"
            />

            <label className="block mt-4 text-gray-300">Password</label>
            <div className="relative">
              <input
                type="password"
                className="w-full px-4 py-2 mt-2 bg-transparent border-b-2 border-gray-400 text-white focus:outline-none"
              />
              <span className="absolute right-2 top-3 cursor-pointer text-gray-300">
                <BsEyeSlashFill />
              </span>
            </div>

            <label className="block mt-4 text-gray-300">Confirm Password</label>
            <div className="relative">
              <input
                type="password"
                className="w-full px-4 py-2 mt-2 bg-transparent border-b-2 border-gray-400 text-white focus:outline-none"
              />
              <span className="absolute right-2 top-3 cursor-pointer text-gray-300">
                <BsEyeSlashFill />
              </span>
            </div>

            <button className="mt-6 w-full bg-gray-500 text-white py-2 rounded-lg font-bold">
              Sign In
            </button>
          </form>

          <p className="mt-4 text-gray-300 text-center">Or Sign In With</p>
          <div className="flex justify-center mt-2 space-x-4">
            <button className="text-white text-xl">
              <FcGoogle />
            </button>
            <button className="text-white text-xl">
              <ImFacebook2 color="#2da3ff" />
            </button>
            <button className="text-white text-xl">
              <FaSquareXTwitter />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
