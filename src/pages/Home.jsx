import "./home.css";
import Banner from "../components/Banner";
import CourseCard from "../components/CourseCard";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Home = () => {
  const platformName = "CodeBridge Academy";
  const platformSlogan = "Bridge learning to real software careers";
  const currentYear = new Date().getFullYear();

  return (
    <div className="home">
      <Header />
      <main>
        <section className="welcome-section">
          <p className="eyebrow">{platformName}</p>
          <h1>Welcome to your next chapter in tech.</h1>
          <p className="slogan">{platformSlogan}</p>
          <Banner />
        </section>
        <section className="catalog-section" aria-labelledby="catalog-heading">
          <div className="section-heading">
            <p className="eyebrow">Learn by building</p>
            <h2 id="catalog-heading">Featured courses</h2>
          </div>
          <div className="course-grid">
            <CourseCard
              title="Modern JavaScript"
              category="Frontend Development"
              price={49}
              isAvailable={true}
            />
            <CourseCard
              title="React Fundamentals"
              category="UI Engineering"
              price={59}
              isAvailable={true}
            />
            <CourseCard
              title="Node.js APIs"
              category="Backend Development"
              price={69}
              isAvailable={false}
            />

          </div>
        </section>
      </main>
      <Footer currentYear={currentYear} />
    </div>
  );
};

export default Home;
