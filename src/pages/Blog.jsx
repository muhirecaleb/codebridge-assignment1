import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PostCard from "../components/PostCard";
import "./blog.css";

const posts = [
  {
    category: "Frontend",
    title: "The quiet power of understanding the browser",
    excerpt:
      "A practical way to think about HTML, CSS, and JavaScript as one system before reaching for another library.",
    author: "Maya Patel",
    readTime: "6 min",
    slug: "understanding-the-browser",
    coverClass: "cover-syntax",
    coverMark: "</>",
  },
  {
    category: "Career",
    title: "Build a portfolio that tells one clear story",
    excerpt:
      "Your projects do more work when each one shows how you think, what you solved, and what you learned.",
    author: "Kevin Niyonzima",
    readTime: "4 min",
    slug: "portfolio-that-tells-a-story",
    coverClass: "cover-career",
    coverMark: "01",
  },
  {
    category: "Practice",
    title: "A kinder workflow for debugging",
    excerpt:
      "Replace guesswork with a small repeatable loop that makes difficult bugs feel observable and solvable.",
    author: "Peter Uwase",
    readTime: "5 min",
    slug: "a-kinder-debugging-workflow",
    coverClass: "cover-debug",
    coverMark: "?",
  },
  {
    category: "Community",
    title: "Why learning in public compounds",
    excerpt:
      "Small notes, honest questions, and useful demos can turn a solo learning habit into a real network.",
    author: "Maya Patel",
    readTime: "3 min",
    slug: "learning-in-public",
    coverClass: "cover-team",
    coverMark: "+",
  },
];

const Blog = () => {
  const currentYear = new Date().getFullYear();

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

        <section
          className="featured-post"
          aria-labelledby="featured-post-heading"
        >
          <PostCard post={posts[0]} featured />
        </section>

        <section aria-labelledby="latest-posts-heading">
          <div className="post-grid-heading">
            <h2 id="latest-posts-heading">Latest notes</h2>
            <p>{posts.length - 1} stories to explore</p>
          </div>
          <div className="post-grid">
            {posts.slice(1).map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      </main>
      <Footer currentYear={currentYear} />
    </div>
  );
};

export default Blog;
