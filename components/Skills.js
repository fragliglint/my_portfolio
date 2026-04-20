// file: components/Skills.js
"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const skillsData = {
  Web: [
    { name: "React", level: 90 },
    { name: "Next JS", level: 85 },
    { name: "Express JS", level: 80 },
    { name: "Node JS", level: 60 },
    { name: "Mongo DB", level: 70 },
    { name: "Sass", level: 70 },
    { name: "Material UI", level: 80 },
  ],
  Programming: [
    { name: "JavaScript", level: 95 },
    { name: "TypeScript", level: 80 },
    { name: "Python", level: 75 },
    { name: "PHP / Laravel", level: 85 },
  ],
  Other: [
    { name: "Machine Learning", level: 70 },
    { name: "AI Integration", level: 75 },
    { name: "Git / GitHub", level: 90 },
    { name: "Docker", level: 60 },
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
  const [activeTab, setActiveTab] = useState("Web");

  return (
    <section id="skills" className="section">
      <div className="container">
        {/* Boxed Header */}
        <div className="section-header-copy">
          <div className="header-box">Skills</div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center" style={{ gap: '15px', marginBottom: '50px', flexWrap: 'wrap' }}>
          {Object.keys(skillsData).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="btn-copy"
              style={{
                background: activeTab === tab ? 'var(--primary)' : 'transparent',
                color: activeTab === tab ? 'var(--bg-main)' : 'var(--text-main)',
                minWidth: '120px'
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
