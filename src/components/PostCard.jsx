import { Link } from "react-router-dom";

const PostCard = ({ post, featured = false }) => {
  return (
    <article className={`post-card${featured ? " post-card-featured" : ""}`}>
      <div className={`post-cover ${post.coverClass}`} aria-hidden="true">
        <span>{post.coverMark}</span>
      </div>
      <div className="post-card-body">
        <div className="post-meta">
          <span>{post.category}</span>
          <span>{post.readTime} read</span>
        </div>
        <h2>{post.title}</h2>
        <p>{post.excerpt}</p>
        <div className="post-card-footer">
          <span>By {post.author}</span>
          <Link to={`/blog/${post.slug}`} aria-label={`Read ${post.title}`}>
            Read story <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
