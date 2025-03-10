"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

interface Post {
  _id: string;
  title: string;
  content: string;
  author: string;
  authorName:string
  image?: string;
}

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        console.log("iD:"+id)
        const res = await fetch(`/api/posts?id=${id}`);
        const data = await res.json();
        if (res.ok) {
          setPost(data.post);
        } else {
          console.error("Error fetching post:", data.message);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPost();
  }, [id]);

  if (loading) return <p className="text-center text-lg mt-10">Loading...</p>;
  if (!post) return <p className="text-center text-lg mt-10">Post not found.</p>;

  return (
    <div className="top-16 w-full absolute flex justify-center bg-slate-800 p-6 items-center">
    <div className="mx-auto p-6 bg-white shadow-md rounded-lg mt-10 w-3/4 ">
      {/* Post Image */}
      {post.image && (
        <div className="relative w-full h-64 mb-4">
          <Image
            src={post.image}
            alt={post.title}
            layout="fill"
            objectFit="contain"
            className="rounded-lg"
          />
        </div>
      )}

      {/* Post Title */}
      <h1 className="text-3xl font-bold">{post.title}</h1>

      {/* Author */}
      <p className="text-gray-600 text-sm mt-2 font-semibold">By: {post.authorName}</p>

      {/* Content */}
      <p className="text-gray-700 mt-4 leading-relaxed">{post.content}</p>
    </div>
    </div>
  );
};

export default PostPage;
