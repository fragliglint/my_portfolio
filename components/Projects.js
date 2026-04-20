// file: components/Projects.js
"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FiGithub, FiExternalLink } from "react-icons/fi";

const projects = [
  {
    title: "TrevioIT",
    desc: "A comprehensive IT solution platform for business management and service tracking.",
    image: "/projects/trevio_it.png",
    tags: ["React", "Node", "Mongo DB", "Express"],
    github: "#",
    url: "#"
  },
  {
    title: "Fish Classification AI",
    desc: "Cutting-edge AI application for identifying fish species using deep learning.",
    image: "/projects/fish_ai.png",
    tags: ["Python", "TensorFlow", "React", "Flask"],
    github: "#",
    url: "#"
  },
  {
    title: "Eventisa",
    desc: "A premium event management system for corporate and private gatherings.",
    image: "/projects/eventisa.png",
    tags: ["Next.js", "Firebase", "Stripe", "Framer"],
    github: "#",
    url: "#"
  },
];

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        {/* Boxed Header */}
        <div className="section-header-copy">
          <div className="header-box">Portfolio</div>
        </div>

        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="card-copy"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="card-image-box">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>

              <div className="card-content">
                <h3 className="card-title">{project.title}</h3>
                <p className="card-desc">{project.desc}</p>
                
                <div className="flex gap-4 mb-6">
                  <a href={project.github} className="social-icon-link" title="GitHub">
                    <FiGithub size={20} />
                  </a>
                  <a href={project.url} className="social-icon-link" title="Live Site">
                    <FiExternalLink size={20} />
                  </a>
                </div>

                <div className="card-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag-btn">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}