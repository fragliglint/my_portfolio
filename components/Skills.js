// file: components/Skills.js
"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const skillsData = {
  Languages: [
    { name: "Python", level: 95 },
    { name: "JavaScript", level: 90 },
    { name: "Java", level: 85 },
    { name: "PHP", level: 85 },
    { name: "SQL", level: 80 },
    { name: "C++", level: 75 },
  ],
  "Web Dev": [
    { name: "Next.js", level: 90 },
    { name: "React.js", level: 90 },
    { name: "React Native", level: 80 },
    { name: "Node.js", level: 75 },
    { name: "Laravel", level: 85 },
    { name: "HTML5 / CSS3", level: 95 },
    { name: "RESTful APIs", level: 85 },
  ],
  "ML / AI": [
    { name: "Deep Learning (YOLO, CNN)", level: 90 },
    { name: "PyTorch / TensorFlow", level: 85 },
    { name: "Self-Supervised Learning", level: 80 },
    { name: "Scikit-learn", level: 80 },
    { name: "Pandas / NumPy / OpenCV", level: 85 },
    { name: "Model Deployment", level: 75 },
  ],
  Tools: [
    { name: "Git / GitHub", level: 95 },
    { name: "MariaDB / MySQL", level: 85 },
    { name: "VS Code / Vercel", level: 95 },
    { name: "Hugging Face", level: 80 },
    { name: "Expo", level: 75 },
  ],
  Research: [
    { name: "Academic Writing", level: 90 },
    { name: "Cross-functional Collaboration", level: 95 },
    { name: "Agile / Scrum", level: 85 },
    { name: "Client Presentation", level: 85 },
    { name: "Problem-Solving", level: 95 },
  ],
};

const SkillBar = ({ name, level }) => {
  return (
    <div className="skill-bar-wrapper">
      <div className="skill-info">
        <span>{name}</span>
        <span className="text-cyan">{level}%</span>
      </div>
      <div className="skill-bar-bg">
        <motion.div
          className="skill-bar-fill"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default function Skills() {
  const [activeTab, setActiveTab] = useState("Languages");

  return (
    <section id="skills" className="section">
      <div className="container">
        {/* Boxed Header */}
        <div className="section-header-copy">
          <div className="header-box">Skills</div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center" style={{ gap: '10px', marginBottom: '50px', flexWrap: 'wrap' }}>
          {Object.keys(skillsData).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="btn-copy"
              style={{
                background: activeTab === tab ? 'var(--primary)' : 'transparent',
                color: activeTab === tab ? 'var(--bg-main)' : 'var(--text-main)',
                minWidth: '130px',
                padding: '8px 16px',
                fontSize: '0.8rem'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Skill Bars Grid */}
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px 60px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              style={{ display: 'contents' }}
            >
              {skillsData[activeTab].map((skill, index) => (
                <SkillBar key={skill.name} {...skill} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
