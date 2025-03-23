"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { HoverBorderGradient } from "./ui/hover-border-gradient";

const Navbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="bg-slate-950 w-full z-50 max-md:z-30  border border-slate-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <span className="self-center text-2xl text-white font-semibold whitespace-nowrap dark:text-white">
            Blog Nest
          </span>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-900 dark:text-white focus:outline-none"
          >
            {isOpen ? (
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>

          {/* Navbar Links */}
          <div
            className={` md:static max-md:z-50  max-md:gap-2 max-md:justify-center max-md:bg-slate-950 border border-gray-800 w-full md:w-auto flex max-md:flex  md:items-center gap-10 p-4 md:p-0 border-b md:border-none dark:border-gray-700 transition-all duration-300 ${
              isOpen ? "max-md:block" : "max-md:hidden"
            }`}
          >

          
            <a
              href="/"
              className="block py-2 px-3 text-white rounded-sm md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white dark:hover:text-blue-600 md:dark:hover:bg-transparent"
            >
              Home
            </a>
            <a
              href="/signup"
              className="block py-2 px-3 text-white rounded-sm md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white dark:hover:text-blue-600 md:dark:hover:bg-transparent"
            >
              Sign Up
            </a>
               <HoverBorderGradient onClick={() => {
                router.push("/login");
              }}
        containerClassName="rounded-full"
        as="button"
        className="dark:bg-black text-white flex items-center space-x-2"
      >
        <span className="font-semibold">Create A Blog</span>
      </HoverBorderGradient>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
