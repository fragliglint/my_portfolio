// file: components/Projects.js
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiExternalLink, FiGithub, FiStar, FiCode, FiLayers } from "react-icons/fi";
import { useState } from "react";
import Image from "next/image";

const projects = [
  {
    id: 1,
    title: "TrevioIT Website",
    desc: "Professional company website with modern design, responsive layout, and optimized performance.",
    tech: ["Next.js", "Vanilla CSS", "Framer Motion", "TypeScript"],
    url: "https://trevioIT.com",
    github: "https://github.com/fragliglint/trevioIT",
    featured: true,
    category: "frontend"
  },
  {
    id: 2,
    title: "Fish Classification AI",
    desc: "Deep learning model for fish species classification with 99%+ accuracy.",
    tech: ["Python", "TensorFlow", "OpenCV", "CNN"],
    url: "https://github.com/fragliglint/Fish_Classification",
    github: "https://github.com/fragliglint/Fish_Classification",
    featured: true,
    category: "machine-learning"
  },
  {
    id: 3,
    title: "Eventisa Management",
    desc: "Comprehensive event management platform with booking and payment processing.",
    tech: ["Laravel", "React", "MariaDB", "Tailwind"],
    url: "https://eventisa.com/",
    github: "https://github.com/fragliglint/Eventisa_an-event-management-system",
    featured: true,
    category: "full-stack"
  },
  {
    id: 4,
    title: "Crop Recommendation",
    desc: "AI-powered crop recommendation system using environmental data analysis.",
    tech: ["Python", "Scikit-learn", "Pandas"],
    url: "https://github.com/fragliglint/Crop-Recommendation-Jupyter-Notebook",
    github: "https://github.com/fragliglint/Crop-Recommendation-Jupyter-Notebook",
    featured: false,
    category: "machine-learning"
  },
  {
    id: 5,
    title: "Courier Management",
    desc: "End-to-end logistics platform with tracking and delivery optimization.",
    tech: ["PHP", "JavaScript", "MariaDB"],
    url: "https://github.com/fragliglint/Courier-management-System",
    github: "https://github.com/fragliglint/Courier-management-System",
    featured: false,
    category: "full-stack"
  }
];

const categories = [
  { id: "all", name: "All Work" },
  { id: "full-stack", name: "Full Stack" },
  { id: "machine-learning", name: "AI/ML" },
  { id: "frontend", name: "Frontend" },
];

export default function Projects() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProjects = projects.filter(project =>
    selectedCategory === "all" || project.category === selectedCategory
  );

  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <motion.div
           ref={ref}
           initial={{ opacity: 0, y: 30 }}
           animate={inView ? { opacity: 1, y: 0 } : {}}
           className="section-header"
        >
          <div className="tag">Portfolio</div>
          <h2 className="section-title">Featured <span className="gradient-text">Projects</span></h2>
          <p className="section-desc">A collection of my work in engineering and creative development.</p>
        </motion.div>

        {/* Filter */}
        <div className="filter-wrapper">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Bento Grid */}
        <motion.div 
          className="projects-grid"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className={`project-card glass ${project.featured ? 'featured' : ''}`}
              >
                <div className="project-image">
                   <div className={`image-placeholder color-${index % 4}`}>
                      <FiLayers size={40} />
                   </div>
                   {project.featured && <div className="featured-badge"><FiStar /> Featured</div>}
                </div>
                
                <div className="project-info">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.desc}</p>
                  
                  <div className="project-tech">
                    {project.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
                  </div>
                  
                  <div className="project-links">
                    <a href={project.url} target="_blank" rel="noreferrer" className="link-btn">
                      <FiExternalLink /> Live Demo
                    </a>
                    <a href={project.github} target="_blank" rel="noreferrer" className="link-icon">
                      <FiGithub />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}