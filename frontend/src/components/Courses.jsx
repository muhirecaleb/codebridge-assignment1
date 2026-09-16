import { useEffect } from "react";
import { useState } from "react";
import CourseCard from "./CourseCard";
import Search from "../components/search";
import { useCourseStore } from "../store/courseStore";

function Courses() {
  const { getCourses, courses } = useCourseStore();
  const [search, setSearch] = useState("");

  useEffect(() => {
    getCourses();
  }, [getCourses]);

  const filteredCourses = courses.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div style={{ padding: "30px", maxWidth: "1000px", margin: "auto" }}>
      <h2>Available courses</h2>

      <Search value={search} onChange={(e) => setSearch(e.target.value)} />

      {filteredCourses.length === 0 ? (
        <p style={{ color: "#64683b" }}>No courses Available</p>
      ) : (
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            marginTop: "20px",
          }}
        >
          {filteredCourses.map((course) => (
            <div key={course.id}>
              {course.isFeatured && (
                <span style={{ color: "yellow" }}>Featured</span>
              )}
              <CourseCard
                title={course.title}
                category={course.category}
                price={course.price}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Courses;
