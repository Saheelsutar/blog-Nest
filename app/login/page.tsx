'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { BackgroundBeamsWithCollision } from '@/components/ui/background-beams-with-collision';

const Page = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        console.log("Login successful:", data);
        alert("Log In Successfully");
        router.push("/dashboard");
      } else {
        console.error("Login failed:", data.message);
        alert(`Login failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while logging in.");
    }
  };

  return (
    <BackgroundBeamsWithCollision className='bg-slate-950 min-h-screen'>
    <div className="flex relative min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8 w-full">
      <div className="md:w-full w-[90%] md:max-w-md space-y-8 bg-slate-900 p-6 rounded-lg shadow-md">
        <h2 className="text-center text-2xl font-bold bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">Sign in to your account</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">Email address</label>
            <input 
              onChange={handleChange} 
              type="email" 
              name="email" 
              id="email" 
              value={form.email} 
              autoComplete="email" 
              required 
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
            <input 
              onChange={handleChange} 
              type="password" 
              name="password" 
              id="password" 
              value={form.password} 
              autoComplete="current-password" 
              required 
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button 
            type="submit" 
            className="w-full flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-white font-medium shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm">
            Sign in
          </button>
        </form>
      </div>
    </div>
    </BackgroundBeamsWithCollision>
  );
};

export default Page;
