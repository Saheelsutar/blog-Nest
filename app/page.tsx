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
    <div className="min-h-screen bg-white">
      <div className="absolute inset-0 -z-10 h-fit min-h-screen w-full bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
      </div>

      <div className="p-6 sm:p-10 flex flex-col justify-center items-center text-center relative top-16">
        <div className="max-w-2xl">
          <h3 className="font-extrabold text-xl sm:text-2xl">Discover</h3>
          <p className="text-gray-600">Explore popular blogs that inspire, educate, and entertain.</p>
        </div>

        <h3 className="mt-6 text-lg sm:text-xl font-bold text-blue-500">Posts</h3>

        {loading ? (
          <p className="mt-4 text-gray-600">Loading posts...</p>
        ) : posts.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl px-4">
            {posts.map((post) => (
              <div
                key={post._id}
                className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 overflow-hidden"
              >
                <img
                  className="w-full h-48 object-cover"
                  src={post.image || "https://flowbite.com/docs/images/blog/image-1.jpg"}
                  alt={post.title}
                />
                <div className="p-4 flex flex-col flex-grow">
                  <h5 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">{post.title}</h5>
                  <p className="mb-3 text-gray-700 dark:text-gray-400">{post.content.substring(0, 100)}...</p>
                  <a
                    href={`/post/${post._id}`}
                    className="mt-auto inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
  );
};

export default Page;
