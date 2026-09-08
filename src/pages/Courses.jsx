import "./home.css";
import CourseCard from "../components/CourseCard";


const Courses = () => {

    const coursesList = [
        {
            title: "Modern JavaScript",
            category: "Frontend Development",
            price: 49,
            isAvailable: true,
            isFeatured: true
        },
        {
            title: "React Fundamentals",
            category: "UI Engineering",
            price: 59,
            isAvailable: true
        },
        {
            title: "Node.js APIs",
            category: "Backend Development",
            price: 69,
            isAvailable: false
        }
    ];

  return (
    <div>
        <h1 style={{ textAlign: "center", marginTop: "20px" }}>
              Courses Page
        </h1>

        { coursesList.length === 0 ? (
            <p>No courses available at the moment.</p>
          ) :  <div className="course-grid">
            {coursesList.map((course, index) => (
                <CourseCard
                    key={index}
                    title={course.title}
                    category={course.category}
                    price={course.price}
                    isFeatured={course.isFeatured}
                />
            ))}
          </div>
        }
              </div>
  )
}

export default Courses;
            