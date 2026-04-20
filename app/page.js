// file: app/page.js
"use client";
import Header from "../components/Header";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Blogs from "../components/Blogs";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import BackToTop from "../components/BackToTop";

export default function Home() {
  return (
    <div className="body-main">
      <Header />
      <main>
        <About />
        <Skills />
        <Projects />
        <Blogs />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}