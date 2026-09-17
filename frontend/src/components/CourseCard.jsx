function CourseCard({
  title,
  category,
  price,
  isEnrolled,
  isBusy,
  onEnroll,
  onDrop,
}) {
  return (
    <article className="course-card">
      <div className="course-card-topline">
        <span className="course-category">{category}</span>
        {isEnrolled && <span className="enrolled-badge">Enrolled</span>}
      </div>
      <h3>{title}</h3>
      <div className="course-card-footer">
        <span className="course-price">${Number(price).toFixed(2)}</span>
        <button
          className={isEnrolled ? "button button-secondary" : "button"}
          type="button"
          onClick={isEnrolled ? onDrop : onEnroll}
          disabled={isBusy}
        >
          {isBusy ? "Updating..." : isEnrolled ? "Drop course" : "Enroll"}
        </button>
      </div>
    </article>
  );
}

export default CourseCard;
