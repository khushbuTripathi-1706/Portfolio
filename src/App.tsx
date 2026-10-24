import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ThemeProvider } from "./theme/ThemeProvider";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { IntroLoader } from "./components/IntroLoader";
import Home from "./pages/Home";
import About from "./pages/About";
import Experience from "./pages/Experience";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Art from "./pages/Art";
import Contact from "./pages/Contact";
import Placeholder from "./pages/Placeholder";

const titles: Record<string, string> = {
  "/about": "About",
  "/experience": "Experience",
};

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <ThemeProvider>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <IntroLoader />
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/art" element={<Art />} />
        <Route path="/contact" element={<Contact />} />
        {Object.entries(titles).map(([path, title]) => (
          <Route
            key={path}
            path={path}
            element={<Placeholder title={title} />}
          />
        ))}
        <Route path="*" element={<Placeholder title="Page not found" />} />
      </Routes>
      <Footer />
    </ThemeProvider>
  );
}
