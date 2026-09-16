import { Link } from "react-router-dom";

const PostCard = ({ post, featured = false }) => {
  return (
    <article className={`post-card${featured ? " post-card-featured" : ""}`}>
      <div className="post-card-body">
        <h2>{post.title}</h2>
        <p>{post.body}</p>
        <div className="post-card-footer">
          <Link to={`/blog/${post.id}`} aria-label={`Read ${post.title}`}>
            Read story <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
