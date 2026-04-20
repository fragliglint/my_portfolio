// file: components/About.js
"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiDownload, FiArrowRight, FiCode, FiCpu, FiCheck, FiDatabase } from "react-icons/fi";
import { useState } from "react";
import Image from "next/image";

const AiIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 12l2 2 4-4" />
    <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z" />
    <path d="M12 8v4l2 2" />
  </svg>
);

export default function About() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [imageLoaded, setImageLoaded] = useState(false);

  const skills = [
    {
      icon: FiCode,
      label: "Full Stack Development",
      description: "Building modern web applications with Laravel, React, and Next.js.",
      color: "blue",
    },
    {
      icon: FiCpu,
      label: "Machine Learning",
      description: "Implementing AI solutions using Python, TensorFlow, and PyTorch.",
      color: "purple",
    },
    {
      icon: AiIcon,
      label: "Artificial Intelligence",
      description: "Developing intelligent systems using NLP and Generative AI.",
      color: "green",
    },
    {
      icon: FiDatabase,
      label: "Data Analysis",
      description: "Extracting insights from complex data using advanced visualization.",
      color: "orange",
    },
  ];

  return (
    <section id="about" className="hero-section">
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>

      <div className="container hero-container">
        <motion.div
          ref={ref}
          className="hero-grid"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
        >
          {/* Text Content */}
          <motion.div className="hero-content" variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
          }}>
            <small className="hero-tag">Available for new opportunities</small>
            <h1 className="hero-title">
              Crafting <span className="gradient-text">Intelligent</span> <br />
              Digital Experiences
            </h1>
            <p className="hero-description">
              I am <span className="highlight">Sifat Noor Siam</span>, a Full Stack Developer & AI Engineer 
              passionate about merging innovative technology with elegant, functional design.
            </p>

            <div className="hero-cta">
              <motion.a href="#projects" className="btn btn-primary" whileHover={{ y: -2 }}>
                View My Work <FiArrowRight />
              </motion.a>
              <motion.a href="/CV_SIAM.pdf" download className="btn btn-secondary" whileHover={{ y: -2 }}>
                <FiDownload /> Download CV
              </motion.a>
            </div>

            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-num">1+</span>
                <span className="stat-label">Year Exp.</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-num">20+</span>
                <span className="stat-label">Projects</span>
              </div>
            </div>
          </motion.div>

          {/* Image Section */}
          <motion.div className="hero-image-wrapper" variants={{
            hidden: { opacity: 0, scale: 0.8 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.2 } }
          }}>
            <div className="hero-image-card">
              <Image
                src="/formal.jpg"
                alt="Profile"
                width={500}
                height={600}
                className={`hero-img ${imageLoaded ? 'loaded' : ''}`}
                onLoadingComplete={() => setImageLoaded(true)}
              />
              <div className="card-glass-overlay"></div>
            </div>
          </motion.div>
        </motion.div>

        {/* Skills Section (Integrated in Bento Style) */}
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="skill-card glass"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { delay: index * 0.1 + 0.5 } }
              }}
            >
              <div className={`skill-icon icon-${skill.color}`}>
                <skill.icon size={24} />
              </div>
              <h3 className="skill-title">{skill.label}</h3>
              <p className="skill-desc">{skill.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
