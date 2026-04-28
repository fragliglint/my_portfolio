"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowLeft, FiCalendar, FiClock } from 'react-icons/fi';
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { blogs } from "../../../components/Blogs";

export default function BlogPost({ params }) {
  const { slug } = params;
  
  // Find the blog from components/Blogs
  const post = blogs.find(b => b.slug === slug);

  if (!post) {
    return (
      <>
        <Header />
        <div className="section" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>Post Not Found</h1>
          <Link href="/#blog" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>
            Go back to Home
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="section container" style={{ paddingTop: '120px', paddingBottom: '80px', maxWidth: '800px', margin: '0 auto' }}>
        
        <Link href="/#blog" style={{ color: 'var(--primary)', display: 'inline-flex', alignItems: 'center', marginBottom: '40px', fontWeight: '600' }}>
          <FiArrowLeft style={{ marginRight: '8px' }} />
          Back to Articles
        </Link>

        <article>
          <div style={{ marginBottom: '40px' }}>
            <div style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(0, 209, 255, 0.1)', color: 'var(--primary)', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '700', marginBottom: '20px' }}>
              {post.category}
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: '800', lineHeight: '1.2', marginBottom: '20px' }}>
              {post.title}
            </h1>
            
            <div style={{ display: 'flex', alignItems: 'center', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-glass)', paddingBottom: '30px', marginBottom: '40px', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginRight: '30px' }}>
                <FiCalendar style={{ marginRight: '8px' }} />
                {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FiClock style={{ marginRight: '8px' }} />
                5 min read
              </div>
            </div>
          </div>

          {post.image && (
            <div style={{ position: 'relative', width: '100%', height: '350px', borderRadius: '12px', overflow: 'hidden', marginBottom: '50px', border: '1px solid var(--border-glass)' }}>
              <Image
                src={post.image}
                alt={post.title}
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
          )}

          <div style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
            <p style={{ fontSize: '1.25rem', marginBottom: '40px', color: 'var(--text-main)', borderLeft: '4px solid var(--primary)', paddingLeft: '20px', fontWeight: '500' }}>
              {post.desc}
            </p>
            
            <h2 style={{ fontSize: '1.8rem', color: 'var(--text-main)', marginTop: '50px', marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '1.5rem', marginRight: '15px' }}>🚀</span>
              How We Implemented It
            </h2>
            <p style={{ marginBottom: '30px' }}>
              {post.content?.implementation || "Implementation details are currently being updated."}
            </p>
            
            <h2 style={{ fontSize: '1.8rem', color: 'var(--text-main)', marginTop: '50px', marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '1.5rem', marginRight: '15px' }}>⚙️</span>
              The Development Process
            </h2>
            <p style={{ marginBottom: '30px' }}>
              {post.content?.process || "Development process details are currently being updated."}
            </p>

            <h2 style={{ fontSize: '1.8rem', color: 'var(--text-main)', marginTop: '50px', marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '1.5rem', marginRight: '15px' }}>💻</span>
              Languages & Tech Stack
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '40px' }}>
              {post.content?.techStack?.map((tech, i) => (
                <span key={i} style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.05)', color: 'var(--text-main)', borderRadius: '8px', fontSize: '0.9rem', border: '1px solid var(--border-glass)' }}>
                  {tech}
                </span>
              )) || <p>Tech stack details coming soon.</p>}
            </div>
          </div>
        </article>
      </div>
      <Footer />
    </>
  );
}
