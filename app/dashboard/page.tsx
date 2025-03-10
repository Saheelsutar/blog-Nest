"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Post {
  _id: string;
  title: string;
  content: string;
  author: string;
  image?: string;
}

const Dashboard = () => {
  const [title, setTitle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [authorId, setAuthorId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/user", { credentials: "include" });
  
        if (res.status === 401) {
          console.error("Unauthorized! Redirecting to login...");
          router.replace("/login"); // ✅ Redirect only when unauthorized
          return;
        }
  
        const data = await res.json();
        if (res.ok) {
          setAuthorId(data.userId);
        }
      } catch (error) {
        console.error("Error fetching user ID", error);
        router.replace("/login"); // ✅ Fallback redirection in case of error
      } finally {
        setLoading(false);
      }
    };
  
    fetchUser();
  }, [router]); // ✅ Ensure useEffect only runs once on mount
  
  useEffect(() => {
    const fetchPosts = async () => {
      if (!authorId) return;
      try {
        const response = await fetch(`/api/posts?author=${authorId}`);
        const data = await response.json();
        if (response.ok) {
          setPosts(data.posts);
        } else {
          console.error("Failed to fetch posts:", data.message);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, [authorId]); 
  
  if (loading) return <p>Loading...</p>;
  

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!authorId) {
      alert("User ID not found. Please log in.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("authorName", authorName);
    formData.append("content", content);
    formData.append("author", authorId);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await fetch("/api/posts/create", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setPosts([...posts, data.post]);
        setTitle("");
        setContent("");
        setImage(null);
        alert("Post Uploaded Successfully!");
      } else {
        console.error("Error creating post:", data.message);
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 top-16 absolute w-full">
      <div className="w-1/4 bg-blue-800 text-white p-5 hidden md:flex md:items-center gap-10 md:flex-col">
        <h3 className="text-white font-bold text-2xl ">BlogNest <div className="text-xl font-semibold py-4">Start Posting Your Own Blogs!</div></h3>
      <Image className="w-full " src="/blog2.png" alt="" width={100} height={100} quality={100} />
      </div>

      <main className="flex-1 p-5">
        <div className="bg-white p-5 border-2 border-slate-900 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Upload a New Post</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Post Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="text"
              placeholder="Enter Author"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />

            <textarea
              placeholder="Post Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <input type="file" onChange={handleImageChange} className="w-full" />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded w-full"
            >
              Upload Post
            </button>
          </form>
        </div>

        <h1 className="text-3xl font-bold">My Posts</h1>

        {/* Post List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
          {posts.map((post) => (
            <div key={post._id} className="p-4 rounded-lg bg-white border border-gray-200  shadow-sm hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
              {/* Image (if available) */}
              {post.image && (
                <div className="w-full h-40 relative">
                  <Image src={post.image} alt="Post Image" layout="fill" objectFit="cover" className="rounded-md" />
                </div>
              )}

              {/* Post Details */}
              <h3 className="text-lg text-white font-semibold mt-2">{post.title}</h3>
              <p className="text-sm text-gray-500 mt-1">
                {post.content.length > 50 ? `${post.content.substring(0, 50)}...` : post.content}
              </p>

              {/* View Button */}
              <button
                onClick={() => router.push(`/post/${post._id}`)}
                className="bg-blue-600 text-white px-3 py-1 rounded mt-3 w-full"
              >
                View
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
