import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { dropCourse, getApiErrorMessage, getMyCourses } from "../api/auth";

const Enrollments = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [droppingId, setDroppingId] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("codebridgeToken")) {
      navigate("/login");
      return;
    }

    getMyCourses()
      .then(({ data }) => setCourses(data.data || []))
      .catch((requestError) => setError(getApiErrorMessage(requestError)))
      .finally(() => setIsLoading(false));
  }, [navigate]);

  const handleDrop = async (courseId) => {
    setDroppingId(courseId);
    setError("");

    try {
      await dropCourse(courseId);
      setCourses((current) => current.filter((course) => course.id !== courseId));
    } catch (requestError) {
      setError(getApiErrorMessage(requestError));
    } finally {
      setDroppingId(null);
    }
  };

  return (
    <div className="dashboard-shell">
      <Navbar />
      <main className="enrollments-page">
        <header className="enrollments-heading">
          <div>
            <p className="dashboard-label">Your learning plan</p>
            <h1>My enrollments</h1>
            <p>Keep track of the courses you are currently taking.</p>
          </div>
          <span className="enrollment-total">
            {courses.length} {courses.length === 1 ? "course" : "courses"}
          </span>
        </header>

        {error && <p className="inline-error" role="alert">{error}</p>}

        {isLoading ? (
          <p className="empty-state">Loading your enrollments...</p>
        ) : courses.length === 0 ? (
          <section className="enrollments-empty">
            <h2>No enrollments yet</h2>
            <p>Choose a course from the home page to start building your learning plan.</p>
            <a className="button" href="/">Browse courses</a>
          </section>
        ) : (
          <div className="enrollment-list enrollment-page-list">
            {courses.map((course) => (
              <article className="enrollment-item" key={course.id}>
                <div className="enrollment-item-content">
                  <span className="course-category">{course.category}</span>
                  <h2>{course.title}</h2>
                  <p>{course.description || "Continue learning at your own pace."}</p>
                  <small>
                    Enrolled {new Date(course.enrolled_at).toLocaleDateString()}
                  </small>
                </div>
                <button
                  className="button button-secondary"
                  type="button"
                  onClick={() => handleDrop(course.id)}
                  disabled={droppingId === course.id}
                >
                  {droppingId === course.id ? "Dropping..." : "Drop course"}
                </button>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Enrollments;
