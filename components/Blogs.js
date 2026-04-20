// file: components/Blogs.js
"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const blogs = [
  {
    title: "React Fundamentals.",
    desc: "React is a famous JavaScript library. As a beginner, you may question what we will build by react. Basically, react is a declarative...",
    image: "/projects/trevio_it.png", // reusing image for placeholder
  },
  {
    title: "What the heck is the Primitive and Non-Primitive data type???",
    desc: "As a beginner, we all struggle to understand the data type in JavaScript. But it actually really easy to understand. JavaScript largely...",
    image: "/projects/fish_ai.png",
  },
  {
    title: "The intermediate concept in Javascript.",
    desc: "We all love javascript, and we love to do things by using javascript. Today we will learn some intermediate concepts...",
    image: "/projects/eventisa.png",
  },
];

export default function Blogs() {
  return (
    <section id="blog" className="section">
      <div className="container">
        <div className="section-header-copy">
          <div className="header-box">Blogs</div>
        </div>

        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {blogs.map((blog, index) => (
            <motion.div
              key={index}
              className="card-copy"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="card-image-box">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="card-content">
                <h3 className="card-title" style={{ fontSize: '1.2rem' }}>{blog.title}</h3>
                <p className="card-desc">{blog.desc}</p>
                <div style={{ marginTop: 'auto' }}>
                  <button className="btn-copy" style={{ padding: '8px 24px', fontSize: '0.8rem' }}>
                    Read more
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
