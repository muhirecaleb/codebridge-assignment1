import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { dropCourse, getApiErrorMessage, getMyCourses } from "../api/auth";

const Dashboard = () => {
  const [user] = useState(() => {
    const savedUser = localStorage.getItem("codebridgeUser");
    const parsedUser = savedUser ? JSON.parse(savedUser) : null;

    return parsedUser || { full_name: "Student", email: "" };
  });
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
  const [droppingId, setDroppingId] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("codebridgeToken")) {
      navigate("/login");
      return;
    }

    getMyCourses()
      .then(({ data }) => setCourses(data.data || []))
      .catch((requestError) => setError(getApiErrorMessage(requestError)));
  }, [navigate]);

  const handleDrop = async (courseId) => {
    setDroppingId(courseId);
    setError("");
    try {
      await dropCourse(courseId);
      setCourses((current) =>
        current.filter((course) => course.id !== courseId),
      );
    } catch (requestError) {
      setError(getApiErrorMessage(requestError));
    } finally {
      setDroppingId(null);
    }
  };

  return (
    <div className="dashboard-shell">
      <Navbar />
      <main className="dashboard-page">
        <section className="dashboard-card">
          <div className="dashboard-header">
            <div>
              <p className="dashboard-label">Welcome back</p>
              <h1>{user.full_name}</h1>
            </div>
            <span className="status-badge">Active</span>
          </div>

          <div className="profile-box">
            <p className="profile-title">Profile</p>
            <p>
              <strong>Name:</strong> {user.full_name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>

          <div className="dashboard-grid">
            <div className="metric-card">
              <span>Courses</span>
              <strong>{courses.length}</strong>
            </div>
            <div className="metric-card">
              <span>Progress</span>
              <strong>0%</strong>
            </div>
            <div className="metric-card">
              <span>Next lesson</span>
              <strong>—</strong>
            </div>
          </div>

          {error && (
            <p className="inline-error" role="alert">
              {error}
            </p>
          )}

          <section
            className="enrollment-section"
            aria-labelledby="enrollment-heading"
          >
            <div className="section-heading-row">
              <div>
                <p className="dashboard-label">Your learning plan</p>
                <h2 id="enrollment-heading">My courses</h2>
              </div>
            </div>

            {courses.length === 0 ? (
              <p className="empty-state">
                You are not enrolled in any courses yet.
              </p>
            ) : (
              <div className="enrollment-list">
                {courses.map((course) => (
                  <article className="enrollment-item" key={course.id}>
                    <div>
                      <span className="course-category">{course.category}</span>
                      <h3>{course.title}</h3>
                      <p>
                        Enrolled{" "}
                        {new Date(course.enrolled_at).toLocaleDateString()}
                      </p>
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
          </section>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
