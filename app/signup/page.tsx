"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Page = () => {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "", cpassword: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.email || !form.password || !form.cpassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (form.password !== form.cpassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Signup successful! Please login.");
        router.push("/login");
      } else {
        alert(`Signup failed: ${data.message}`);
      }
    } catch (error) {
      alert("An error occurred while signing up.");
    }
  };

  return (
    <>
 <div className="relative h-auto bg-slate-950 min-h-screen ">
 <div className="absolute bottom-0 h-full w-full left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      {/* Signup Container */}
      <div className="mx-auto relative w-full max-h-fit flex flex-col md:flex-row md:pr-10 justify-center items-center py-10">
        {/* Left Section */}
        <div className="rounded-md w-3/4 py-5 px-2 md:w-1/3  md:px-4 md:py-10 text-white sm:px-10 md:m-6 md:mr-8">
          <p className="text-2xl text-center max-md:text-center font-bold md:text-4xl md:leading-snug">Get Started</p>
          <h3 className="mb-4 text-center text-2xl max-md:text-center font-bold md:text-4xl md:leading-snug">with Blog Nest</h3>
          <Image className="w-full " src="/blog_img.png" alt="Blog Illustration" unoptimized width={100} height={100} />
        </div>

        {/* Right Section */}
        <div className="md:px-4 p-6 md:py-10  w-full md:w-1/2 max-h-fit">
          <h2 className="mb-2 text-3xl max-md:text-center md:p-5 font-bold text-white">Sign Up</h2>
          {/* Email */}
          <label className="mb-1 text-left w-fit font-medium text-gray-500">Email</label>
          <div className="mb-4">
          
            <input
              onChange={handleChange}
              name="email"
              value={form.email}
              type="email"
              className="w-full border-2 border-gray-300 rounded-md px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:border-blue-600 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <label className="mb-1 font-medium text-gray-500">Password</label>
          <div className="mb-4">
            <input
              onChange={handleChange}
              name="password"
              value={form.password}
              type="password"
              className="w-full border-2 border-gray-300 rounded-md px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:border-blue-600 focus:outline-none"
              placeholder="Choose a password"
            />
          </div>

          {/* Confirm Password */}
          <label className="mb-1 font-medium text-gray-500">Confirm Password</label>
          <div className="mb-4">
            <input
              onChange={handleChange}
              name="cpassword"
              value={form.cpassword}
              type="password"
              className="w-full border-2 border-gray-300 rounded-md px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:border-blue-600 focus:outline-none"
              placeholder="Confirm your password"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-fit md:w-auto mt-2 hover:shadow-blue-600/40 rounded-xl bg-gradient-to-r from-blue-700 to-blue-600 px-8 py-3 font-bold text-white transition-all hover:opacity-90 hover:shadow-lg"
          >
            Sign Up
          </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
