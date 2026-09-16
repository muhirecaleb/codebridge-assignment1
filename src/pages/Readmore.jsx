import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react'
import './blog.css';
import { useParams } from 'react-router-dom';


const Readmore = () => {
    
    
    const { id } = useParams();  
    
    const fetchPost = async () => {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
      return response.data;
    };

    const [post , setPost]  = useState({});

      useEffect(() => {
        const loadPosts = async () => {
          try {
            const data = await fetchPost();
            setPost(data);
          } catch (error) {
            console.error("Failed to load posts:", error);
          }
        };
    
        loadPosts();
      }, []);


  return (
    <section className='blog-pagee'>

    <div className='readmore'>
        <h1 className='readmoreH'>{post.title}</h1>
        <p>{post.body}</p>
    </div>
    </section>
  )
}

export default Readmore