import "./home.css";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Courses from "../components/Courses";
import Navbar from "../components/Navbar";

const Home = () => {
  const platformName = "CodeBridge Academy";
  const platformSlogan = "Bridge learning to real software careers";
  const currentYear = new Date().getFullYear();

  return (
    <div className="home">
      <Navbar />
      <main>
        <section className="welcome-section">
          <p className="eyebrow">{platformName}</p>
          <h1>You are welcome !</h1>
          <p className="slogan">{platformSlogan}</p>
          <Banner />
        </section>
        <section className="catalog-section" aria-labelledby="catalog-heading">
          <div className="section-heading">
            <p className="eyebrow">Learn by building</p>
            <h2 id="catalog-heading">Featured courses</h2>
          </div>

          <Courses />
        </section>
      </main>
      <Footer currentYear={currentYear} />
    </div>
  );
};

export default Home;
