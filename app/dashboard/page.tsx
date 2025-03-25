"use client";
import React, { useState, useEffect,useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

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
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string>("");



  const fetchUser = async () => {
    try {
      const res = await fetch("/api/auth/user", { credentials: "include" });
       setLoading(true)
      if (res.status === 401) {
        alert("Session Expired! Login Again"); 
        router.replace("/login"); 
        return;
      }
      const data = await res.json();
      if (res.ok) {
        setAuthorId(data.userId);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching user ID", error);
      router.replace("/login"); 
    } 
  };


  useEffect(() => {
    fetchUser();
  }, []); 
  
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
  
  if (loading) return <div className="text-center p-10 min-h-screen bg-slate-950 text-white text-lg">Loading...</div>;
  

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
      setFileName(e.target.files[0].name);
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
    <div className="relative h-auto bg-slate-950 min-h-screen ">
      <div className="absolute bottom-0 h-full w-full left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
    <div className="relative">
    <div className="md:flex w-full justify-around items-center ">
     
      <div className="flex flex-col">  {/* left part */}
        <h3 className="pt-10 mt-10 bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r p-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)] text-center font-bold text-2xl md:text-3xl ">BlogNest <div className="md:text-2xl text-xl  p-4  text-center font-semibold ">Start Posting Your Own Blogs!</div></h3>
      </div>
        <div className=" p-4  border border-slate-600 text-white md:w-fit w-[90%]  md:mt-10 mx-auto bg-slate-900 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4 ">Upload a New Post</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e:React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
              className="w-full p-2 border  bg-gray-800 placeholder:text-white text-white border-gray-800 rounded"
              required
            />
            <input
              type="text"
              placeholder="Author Name"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="w-full p-2 border  bg-gray-800 placeholder:text-white text-white border-gray-800 rounded"
              required
            />

            <textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 border bg-gray-800 placeholder:text-white text-white border-gray-800 rounded"
              required
            />
            <input
  type="file"
  onChange={handleImageChange}
  ref={fileInputRef}
  className="hidden" // Hides the default file input
/>
<span className="text-gray-400 text-sm text-center m-4">{fileName}</span>
<Button
      component="label"
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
      onClick={() => fileInputRef.current?.click()}
      sx={{
        backgroundColor: "#9333ea", // Tailwind 'purple-600'
        "&:hover": { backgroundColor: "#7e22ce" }, // Tailwind 'purple-700'
        color: "white",
        fontSize:10
        
      }}
  className="w-fit md:text-xl text-sm text-white px-2 py-1 md:px-4 md:py-2 rounded-lg transition"
    > Upload Image
</Button>
            <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-slate-800 text-white md:px-4 md:py-2 px-2 py-1 text-sm md:text-md rounded w-fit"
            >
              Upload Post
            </button>
            </div>
          </form>
        </div>
    </div>

      <h1 className="md:text-2xl text-center max-md:text-lg text-white font-bold mt-10">My Posts</h1>
      {posts.length==0 && <div className="text-gray-400 text-md text-center max-md:text-sm py-4">No Post Yet</div>}
        {/* Post List */}
        
       {posts.length>0 && <div className="grid md:grid-cols-2 max-sm:grid-cols-1 lg:grid-cols-3 gap-6 mt-5 pb-2">
          {posts.map((post) => (
            <div key={post._id} className="md:p-6 py-6 px-4 max-md:w-[90%] mx-auto rounded-lg border border-slate-700  shadow-sm hover:bg-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 w-[70%]">
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
                className="bg-blue-600 text-white px-3 py-1 rounded mt-3 w-fit"
              >
                View
              </button>
            </div>
          ))}
        </div>
}
    </div>
    </div>
  );
};

export default Dashboard;
