const CourseCard = ({ title, category, price, isAvailable , isFeatured }) => {
  return (
    <article className="course-card">
      <p className="course-category">{category}</p>
      <h3>{title}</h3>
      <p className="course-price">$ {price}</p>
      <p
        className={
          isAvailable ? "availability available" : "availability unavailable"
        }
      >
        {isAvailable ? "Available now" : "Not yet"}
      </p>
      {isFeatured && <span className="featured-badge">Featured</span>}
    </article>
  );
};

export default CourseCard;
