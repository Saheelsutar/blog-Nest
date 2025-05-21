
import React from 'react'
import Home from '@/components/Home';


const Page = async() => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts`);
        const data = await res.json();
        return <Home posts={data.posts}/>
      } catch (error) {
        console.error("Error fetching posts:", error);
        return <div>Error loading posts</div>;
      } 


}

export default Page
