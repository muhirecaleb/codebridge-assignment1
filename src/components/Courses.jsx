import { useState } from "react";
import CourseCard from "./CourseCard";
import Search from "../components/search";

function Courses() {
  const [search, setSearch] = useState("");

  const courseList = [
    {
      category: "Frontend",
      title: "React Foundamentals",
      instructor: "Kevin",
      price: 29.99,
    },
    {
      category: "Backend",
      title: "Nodejs",
      instructor: "Peter",
      price: 29.99,
    },
    {
      category: "Frontend",
      title: "React Foundamentals",
      instructor: "Muhashyi",
      price: 29.99,
    },
    {
      category: "Database",
      title: "Database foundamental",
      instructor: "Kalisa",
      price: 29.99,
    },
    {
      category: "Languages",
      title: "English",
      instructor: "Mugisha",
      price: 44.99,
    },
  ];

  const filteredCourses = courseList.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
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
            <div key={`${course.title}-${course.instructor}`}>
              {course.isFeatured && (
                <span style={{ color: "yellow" }}>Featured</span>
              )}
              <CourseCard
                title={course.title}
                category={course.category}
                instructor={course.instructor}
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