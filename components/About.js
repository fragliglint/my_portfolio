// file: components/About.js
"use client";
import { motion } from "framer-motion";
import { FiDownload } from "react-icons/fi";
import HeroAnimation from "./HeroAnimation";
import Image from "next/image";
import { TextAnimate } from "./TextAnimate";

export default function About() {
  return (
    <div id="about">
      {/* --- HERO SECTION --- */}
      <section className="section" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', paddingTop: '10px', paddingBottom: '10px' }}>
        <div className="container">
          <div className="grid hero-grid" style={{ gridTemplateColumns: '1.2fr 0.8fr', gap: '40px', alignItems: 'center' }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="hero-role" style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Hello! I am</p>
              <h1 className="hero-name" style={{ fontSize: '3.2rem', lineHeight: '1.1', marginBottom: '15px' }}>
                <TextAnimate animation="blurInUp" by="character">SIFAT NOOR SIAM</TextAnimate>
              </h1>
              <h2 className="hero-role" style={{ marginBottom: '15px' }}>AI/ML & Software Engineer</h2>
              <p className="text-secondary" style={{ marginBottom: '30px', maxWidth: '700px', lineHeight: '1.6', textAlign: 'justify' }}>
                Web Developer <span className="text-cyan">•</span> AI/ML Engineer <span className="text-cyan">•</span> Software Development <span className="text-cyan">•</span> Data Analyst <span className="text-cyan">•</span> Problem Solver
                <br />
                Based in Dhaka, Bangladesh. Dedicated to building high-performance applications with 1.5 years of experience in AI, ML, Software and Web development.
              </p>
              <a href="/Sifat_Noor_Siam_s_Resume (1).pdf" download className="btn-copy">
                Resume
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hero-animation-wrapper"
            >
              <HeroAnimation />
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- ABOUT ME SECTION --- */}
      <section className="section">
        <div className="container">
          {/* Boxed Header */}
          <div className="section-header-copy">
            <div className="header-box">About Me</div>
          </div>

          <div className="grid" style={{ gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)', gap: '60px', alignItems: 'center' }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-secondary" style={{ fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '20px', textAlign: 'justify' }}>
                Innovative Computer Science student and published researcher with expertise in
                deploying full-stack web applications and end-to-end machine learning systems.
                I have demonstrated success in building AI-powered mobile applications, authoring
                peer-reviewed conference papers, and developing high-performance commercial
                websites using modern frameworks like Next.js and Laravel.
              </p>
              <p className="text-secondary" style={{ fontSize: '1.05rem', lineHeight: '1.8', textAlign: 'justify' }}>
                I combine strong theoretical foundations with practical software engineering skills
                to deliver impactful, intelligent solutions. Dedicated to bridging the gap between
                advanced research and real-world application.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <div style={{ position: 'relative', width: '100%', maxWidth: '400px', aspectRatio: '1/1', borderRadius: '30px', overflow: 'hidden', border: '1px solid var(--border-glass)' }}>
                <Image
                  src="/siam_formal.png"
                  alt="Sifat Noor Siam"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
