import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PostCard from "../components/PostCard";
import "./blog.css";
import axios from "axios";
import { useEffect, useState } from "react";

const fetchPosts = async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return response.data;
};

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (error) {
        console.error("Failed to load posts:", error);
      }
    };

    loadPosts();
  }, []);

  const currentYear = new Date().getFullYear();

  if (posts.length === 0) {
    return <div className="loading">Loading journal entries...</div>;
  }

  return (
    <div className="blog-page">
      <Navbar />
      <main className="blog-main blog-shell">
        <header className="blog-intro">
          <div>
            <p className="blog-eyebrow">The CodeBridge journal</p>
            <h1>Ideas for the road ahead.</h1>
          </div>
          <p className="blog-intro-copy">
            Field notes on learning to code, building with intention, and
            finding your place in tech.
          </p>
        </header>

        <section className="featured-post" aria-labelledby="featured-post-heading">
          <PostCard post={posts[0]} featured />
        </section>

        <section aria-labelledby="latest-posts-heading">
          <div className="post-grid-heading">
            <h2 id="latest-posts-heading">Latest notes</h2>
            <p>{posts.length - 1} stories to explore</p>
          </div>
          <div className="post-grid">
            {posts.slice(1).map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      </main>
      <Footer currentYear={currentYear} />
    </div>
  );
};

export default Blog;
