const CourseCard = ({ title, category, price, isAvailable }) => {
  return (
    <article className="course-card">
      <p className="course-category">{category}</p>
      <h3>{title}</h3>
      <p className="course-price">RWF {price}</p>
      <p
        className={
          isAvailable ? "availability available" : "availability unavailable"
        }
      >
        {isAvailable ? "Available now" : "Not yet"}
      </p>
    </article>
  );
};

export default CourseCard;
