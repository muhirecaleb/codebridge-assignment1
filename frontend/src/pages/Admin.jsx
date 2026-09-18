import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  createCourse,
  deleteCourse,
  getAdminDashboard,
  getApiErrorMessage,
  getCourses,
} from "../api/auth";

const emptyForm = { title: "", description: "", category: "", price: "" };

const Admin = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ stats: {}, recentEnrollments: [] });
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("codebridgeUser") || "null");
    if (!localStorage.getItem("codebridgeToken") || user?.role !== "admin") {
      navigate("/login");
      return;
    }

    Promise.all([getAdminDashboard(), getCourses()])
      .then(([dashboardResponse, coursesResponse]) => {
        setData(
          dashboardResponse.data.data || { stats: {}, recentEnrollments: [] },
        );
        setCourses(coursesResponse.data.data || []);
      })
      .catch((requestError) => setError(getApiErrorMessage(requestError)));
  }, [navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setNotice("");
    setIsSaving(true);
    try {
      const { data: response } = await createCourse({
        ...form,
        price: Number(form.price),
      });
      setCourses((current) => [response.data, ...current]);
      setData((current) => ({
        ...current,
        stats: {
          ...current.stats,
          courses: Number(current.stats.courses || 0) + 1,
        },
      }));
      setForm(emptyForm);
      setNotice("Course created successfully.");
    } catch (requestError) {
      setError(getApiErrorMessage(requestError));
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (courseId) => {
    if (!window.confirm("Delete this course and its enrollments?")) return;
    setError("");
    try {
      await deleteCourse(courseId);
      setCourses((current) =>
        current.filter((course) => course.id !== courseId),
      );
      setData((current) => ({
        ...current,
        stats: {
          ...current.stats,
          courses: Math.max(Number(current.stats.courses || 1) - 1, 0),
        },
      }));
    } catch (requestError) {
      setError(getApiErrorMessage(requestError));
    }
  };

  const stats = [
    ["Students", data.stats.students || 0],
    ["Courses", data.stats.courses || 0],
    ["Enrollments", data.stats.enrollments || 0],
  ];

  return (
    <div className="admin-shell">
      <Navbar />
      <main className="admin-page">
        <header className="admin-heading">
          <div>
            <p className="dashboard-label">Administration</p>
            <h1>Keep the academy moving.</h1>
            <p>
              Manage the course catalog and keep an eye on recent learner
              activity.
            </p>
          </div>
        </header>

        <div className="admin-stats">
          {stats.map(([label, value]) => (
            <article className="admin-stat" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </article>
          ))}
        </div>

        {error && (
          <p className="inline-error" role="alert">
            {error}
          </p>
        )}
        {notice && (
          <p className="admin-notice" role="status">
            {notice}
          </p>
        )}

        <div className="admin-layout">
          <section className="admin-section">
            <div className="section-heading-row">
              <h2>Add a course</h2>
            </div>
            <form className="admin-form" onSubmit={handleSubmit}>
              <label htmlFor="course-title">Title</label>
              <input
                id="course-title"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
              />
              <label htmlFor="course-category">Category</label>
              <input
                id="course-category"
                name="category"
                value={form.category}
                onChange={handleChange}
                required
              />
              <label htmlFor="course-price">Price</label>
              <input
                id="course-price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={handleChange}
                required
              />
              <label htmlFor="course-description">Description</label>
              <textarea
                id="course-description"
                name="description"
                rows="4"
                value={form.description}
                onChange={handleChange}
              />
              <button type="submit" disabled={isSaving}>
                {isSaving ? "Creating..." : "Create course"}
              </button>
            </form>
          </section>

          <section className="admin-section">
            <div className="section-heading-row">
              <h2>Course catalog</h2>
              <span className="course-count">{courses.length} courses</span>
            </div>
            <div className="admin-course-list">
              {courses.map((course) => (
                <article className="admin-course" key={course.id}>
                  <div>
                    <span className="course-category">{course.category}</span>
                    <h3>{course.title}</h3>
                    <p>{course.description || "No description provided."}</p>
                  </div>
                  <button
                    className="button button-secondary"
                    type="button"
                    onClick={() => handleDelete(course.id)}
                  >
                    Delete
                  </button>
                </article>
              ))}
            </div>
          </section>
        </div>

        <section className="admin-section admin-activity">
          <div className="section-heading-row">
            <h2>Recent enrollments</h2>
          </div>
          {data.recentEnrollments.length === 0 ? (
            <p className="empty-state">No enrollments yet.</p>
          ) : (
            <div className="activity-list">
              {data.recentEnrollments.map((enrollment) => (
                <div className="activity-row" key={enrollment.id}>
                  <strong>{enrollment.full_name}</strong>
                  <span>{enrollment.title}</span>
                  <small>
                    {new Date(enrollment.enrolled_at).toLocaleDateString()}
                  </small>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Admin;
