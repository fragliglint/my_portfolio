// file: components/Blogs.js
"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export const blogs = [
  {
    title: "Deep Learning for Real-world Applications.",
    slug: "deep-learning-real-world-applications",
    desc: "Exploring the challenges and solutions in deploying CNN models for real-time fish classification and object tracking in production environments. In this area we used Self-supervised machine learning (SimCLR, MOCO, BYOL) to classify the fish.",
    image: "/projects/fish_ai.png",
    category: "AI / ML",
    content: {
      implementation: "We built a robust pipeline that takes real-time video feeds and processes them through our trained CNN models. The system uses self-supervised learning techniques (SimCLR, MOCO, BYOL) to improve accuracy even with limited labeled data, ensuring high-performance classification in dynamic real-world environments.",
      process: "The development process started with data collection and preprocessing, followed by model training using self-supervised frameworks. We then optimized the models for inference speed and integrated them into a production-ready application using a microservices architecture.",
      techStack: ["Python", "TensorFlow", "PyTorch", "OpenCV", "Flask"]
    }
  },
  {
    title: "Bridging the Gap: Academic Research to Production Code.",
    slug: "bridging-the-gap-academic-research-to-production-code",
    desc: "How I translate theoretical machine learning research into functional, scalable software solutions. A look into my published work and methodologies.",
    image: "/trevio1.png",
    category: "Research",
    content: {
      implementation: "By establishing a strict MLOps pipeline, we bridge the gap between Jupyter notebooks and scalable backend services. This involves containerizing models, setting up CI/CD for machine learning, and writing comprehensive test suites for model validation.",
      process: "We take research papers and reproduce their results first. Once validated, we refactor the academic code into clean, modular, and scalable software components that can be deployed via REST or gRPC APIs.",
      techStack: ["Python", "Docker", "Kubernetes", "FastAPI", "GitHub Actions"]
    }
  },
  {
    title: "The JavaScript Engine Deep Dive.",
    slug: "the-javascript-engine-deep-dive",
    desc: "Understanding memory management, heap vs stack, and how V8 handles Primitive and Non-Primitive data types for high-performance execution.",
    image: "/projects/eventisa.png",
    category: "JavaScript",
    content: {
      implementation: "This article breaks down the internal workings of the V8 engine, exploring how the parser, interpreter (Ignition), and optimizing compiler (TurboFan) work together to execute JavaScript at near-native speeds.",
      process: "I analyzed the memory allocation strategies, comparing stack and heap usage, and created benchmarks to demonstrate the performance impact of hidden classes and inline caching in modern JavaScript applications.",
      techStack: ["JavaScript", "Node.js", "C++", "V8 Engine"]
    }
  },
  {
    title: "Architecture of Scalable Next.js Applications.",
    slug: "architecture-of-scalable-nextjs-applications",
    desc: "Best practices for building large-scale, SEO-friendly applications using the App Router, Server Components, and optimized design systems.",
    image: "/trevio1.png",
    category: "Web Dev",
    content: {
      implementation: "We implemented a scalable frontend architecture leveraging React Server Components to reduce the client-side JavaScript bundle. We also integrated advanced caching strategies and dynamic routing to ensure lightning-fast page loads.",
      process: "The process involved migrating from the old Pages router to the new App router, establishing a robust design system with Tailwind CSS, and setting up automated end-to-end testing.",
      techStack: ["Next.js", "React", "Tailwind CSS", "TypeScript", "Vercel"]
    }
  },
  {
    title: "Laravel & PHP: Beyond the Basics.",
    slug: "laravel-php-beyond-the-basics",
    desc: "Deep diving into Eloquent ORM, Service Providers, and architectural patterns that make Laravel the go-to framework for robust commercial websites.",
    image: "/projects/eventisa.png",
    category: "Backend",
    content: {
      implementation: "We utilized advanced Eloquent features like polymorphic relationships and query scopes to optimize database interactions. We also implemented custom Service Providers and decoupled the business logic using the Repository pattern.",
      process: "The backend was designed with scalability in mind, using queue workers for asynchronous tasks, event-driven architecture, and comprehensive API documentation.",
      techStack: ["PHP", "Laravel", "MySQL", "Redis", "Docker"]
    }
  },
  {
    title: "Advanced React Patterns & Performance.",
    slug: "advanced-react-patterns-and-performance",
    desc: "Mastering hooks, context, and state management techniques to build fluid, glassmorphism-inspired user interfaces with zero-latency responses.",
    image: "/projects/fish_ai.png",
    category: "Frontend",
    content: {
      implementation: "We built highly reusable custom hooks and applied advanced patterns like Compound Components and Render Props. We also optimized performance using React.memo, useMemo, and useCallback to prevent unnecessary re-renders.",
      process: "Through profiling the React tree, we identified bottlenecks and restructured our state management context to split independent state slices, achieving a perfectly smooth 60fps user experience.",
      techStack: ["React", "Framer Motion", "Context API", "CSS Modules"]
    }
  },
  {
    title: "Building Shohochor: Object Detection in React Native.",
    slug: "building-shohochor-object-detection-in-react-native",
    desc: "Training a custom object detection model and integrating it into a mobile app using React Native, Expo, Docker, and Google Maps API.",
    image: "/projects/Shohochor(English).jpeg",
    category: "Mobile Dev",
    content: {
      implementation: "We integrated a custom-trained object detection model directly into a React Native mobile application. By utilizing the device's camera feed, the app processes frames in real-time. We also seamlessly integrated the Google Maps API for real-time location tracking and navigation within the app.",
      process: "First, we collected data and trained the object detection model inside a Dockerized environment to ensure consistency. Once trained, the model was converted for mobile deployment. The frontend was built with Expo for rapid iteration, while the backend APIs connected the mapping and detection services.",
      techStack: ["React Native", "Expo", "Docker", "Machine Learning", "Google Maps API", "Python"]
    }
  }
];

export default function Blogs() {
  return (
    <section id="blog" className="section">
      <div className="container">
        <div className="section-header-copy">
          <div className="header-box">Blogs / Publications</div>
        </div>

        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
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
                <div style={{
                  position: 'absolute',
                  top: '15px',
                  left: '15px',
                  background: 'var(--primary)',
                  color: 'var(--bg-main)',
                  padding: '4px 12px',
                  borderRadius: '4px',
                  fontSize: '0.7rem',
                  fontWeight: '700',
                  zIndex: 10
                }}>
                  {blog.category}
                </div>
              </div>
              <div className="card-content">
                <h3 className="card-title" style={{ fontSize: '1.2rem', lineHeight: '1.4' }}>{blog.title}</h3>
                <p className="card-desc" style={{ fontSize: '0.9rem' }}>{blog.desc}</p>
                <div style={{ marginTop: 'auto' }}>
                  <Link href={`/blog/${blog.slug}`} className="btn-copy" style={{ display: 'inline-block', padding: '8px 24px', fontSize: '0.8rem', textDecoration: 'none' }}>
                    Read more
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
