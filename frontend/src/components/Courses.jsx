import { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import Search from "../components/search";
import { useCourseStore } from "../store/courseStore";
import {
  dropCourse,
  enrollInCourse,
  getApiErrorMessage,
  getMyCourses,
} from "../api/auth";

function Courses() {
  const { getCourses, courses } = useCourseStore();
  const [search, setSearch] = useState("");
  const [enrolledIds, setEnrolledIds] = useState(new Set());
  const [busyId, setBusyId] = useState(null);
  const [error, setError] = useState("");
  const isLoggedIn = Boolean(localStorage.getItem("codebridgeToken"));

  useEffect(() => {
    getCourses();
  }, [getCourses]);

  useEffect(() => {
    if (!isLoggedIn) return;
    getMyCourses()
      .then(({ data }) =>
        setEnrolledIds(new Set((data.data || []).map((course) => course.id))),
      )
      .catch(() => setError("Sign in again to manage your enrollments."));
  }, [isLoggedIn]);

  const updateEnrollment = async (courseId, action) => {
    if (!isLoggedIn) {
      setError("Please sign in to enroll in a course.");
      return;
    }

    setBusyId(courseId);
    setError("");
    try {
      if (action === "enroll") {
        await enrollInCourse(courseId);
        setEnrolledIds((current) => new Set(current).add(courseId));
      } else {
        await dropCourse(courseId);
        setEnrolledIds((current) => {
          const next = new Set(current);
          next.delete(courseId);
          return next;
        });
      }
    } catch (requestError) {
      setError(getApiErrorMessage(requestError));
    } finally {
      setBusyId(null);
    }
  };

  const filteredCourses = courses.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="courses-panel">
      <div className="courses-heading">
        <div>
          <p className="eyebrow">Build your path</p>
          <h2>Available courses</h2>
        </div>
        <span className="course-count">{filteredCourses.length} courses</span>
      </div>

      <Search value={search} onChange={(e) => setSearch(e.target.value)} />
      {error && (
        <p className="inline-error" role="alert">
          {error}
        </p>
      )}

      {filteredCourses.length === 0 ? (
        <p className="empty-state">No courses found.</p>
      ) : (
        <div className="course-grid">
          {filteredCourses.map((course) => (
            <div key={course.id}>
              <CourseCard
                title={course.title}
                category={course.category}
                price={course.price}
                isEnrolled={enrolledIds.has(course.id)}
                isBusy={busyId === course.id}
                onEnroll={() => updateEnrollment(course.id, "enroll")}
                onDrop={() => updateEnrollment(course.id, "drop")}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Courses;
