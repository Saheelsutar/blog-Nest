"use client";

import React, { useState, useEffect } from "react";

interface Post {
  _id: string;
  title: string;
  content: string;
  image?: string;
}

const Page = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts");
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
    <div className="relative h-auto bg-slate-950 min-h-screen ">
      <div className="absolute bottom-0 h-full w-full left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="p-6 mx-auto sm:p-10 flex flex-col h-full justify-center items-center text-center relative">
        <div className="max-w-2xl">
          <h3 className="font-extrabold text-xl text-white sm:text-2xl">Discover</h3>
          <p className="text-gray-300">Explore popular blogs that inspire, educate, and entertain.</p>
        </div>

        <h3 className="mt-6 text-lg sm:text-xl font-bold text-blue-500">Posts</h3>

        {loading ? (
          <p className="mt-4 text-gray-600">Loading posts...</p>
        ) : posts.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl px-4">
            {posts.map((post) => (
              <div
                key={post._id}
                className="flex flex-col h-full py-4 px-2 max-md:py-2 max-md:px-1 hover:shadow-md  dark:bg-gray-800 dark:hover:bg-gray-700 overflow-hidden [background:linear-gradient(45deg,#172033,theme(colors.slate.800)_50%,#172033)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,_theme(colors.indigo.500)_86%,_theme(colors.indigo.300)_90%,_theme(colors.indigo.500)_94%,_theme(colors.slate.600/.48))_border-box] rounded-xl border-2 border-transparent animate-border">
                <img
                  className="w-full p-2 h-48 object-fit rounded-xl "
                  src={post.image}
                  alt={post.title}
                />
                <div className="p-4 flex flex-col flex-grow">
                  <h5 className="mb-2 text-xl font-bold text-white dark:text-white">{post.title}</h5>
                  <p className="mb-3 text-gray-400 dark:text-gray-400">{post.content.substring(0, 100)}...</p>
                  <a
                    href={`/post/${post._id}`}
                    className="mt-auto inline-flex w-fit items-center px-2 py-3 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Read more
                    <svg
                      className="rtl:rotate-180 w-3.5 h-3.5 ml-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-gray-600">No posts available.</p>
        )}
      </div>
    </div>
    </>

  );
};

export default Page;
