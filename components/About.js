// file: components/About.js
"use client";
import { motion } from "framer-motion";
import { FiDownload } from "react-icons/fi";
import Image from "next/image";

export default function About() {
  return (
    <div id="about">
      {/* --- HERO SECTION --- */}
      <section className="section" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="hero-role" style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Hello! I am</p>
            <h1 className="hero-name">Sifat Noor <br /> Siam</h1>
            <h2 className="hero-role">Full Stack Developer</h2>
            <p className="text-secondary" style={{ marginBottom: '30px', maxWidth: '600px', lineHeight: '1.6' }}>
              Web Developer <span className="text-cyan">•</span> AI Enthusiast <span className="text-cyan">•</span> Problem Solver
              <br />
              Based in Dhaka, Bangladesh. Dedicated to building high-performance applications.
            </p>
            <a href="/CV_SIAM.pdf" download className="btn-copy">
              Resume
            </a>
          </motion.div>
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
              <p className="text-secondary" style={{ fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '20px' }}>
                I am a self-taught, passionate developer. I develop web applications. 
                My key skill is in Javascript. I love to make most of the things using JavaScript. 
                One of the good stuffs as a self-taught web developer is that I have to find the solution 
                myself, which helps me learn more preciously.
              </p>
              <p className="text-secondary" style={{ fontSize: '1.05rem', lineHeight: '1.8' }}>
                During my learning process, I have developed numerous skills and strengthened existing 
                abilities, which would serve me well. I can hone my aptitude in new skills very fast.
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
                  src="/formal.jpg"
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
