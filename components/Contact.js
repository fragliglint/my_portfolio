// file: components/Contact.js
"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend, FiCheck, FiAlertCircle } from "react-icons/fi";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ loading: false, message: null, error: false });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: null, error: false });
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ 
          loading: false, 
          message: data.message || "Message sent successfully!", 
          error: false 
        });
        setForm({ name: "", email: "", message: "" });
      } else {
        throw new Error(data.error || "Failed to send message");
      }
    } catch (error) {
      setStatus({ 
        loading: false, 
        message: error.message || "An unexpected error occurred. Please try again.", 
        error: true 
      });
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        {/* Boxed Header */}
        <div className="section-header-copy">
          <div className="header-box">Contact Me</div>
        </div>

        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px' }}>
          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="hero-role" style={{ fontSize: '1.8rem', marginBottom: '20px', color: 'var(--text-main)' }}>
              I will love to talk with. Send me email or DM me on my social media
            </h2>
            <p className="text-secondary" style={{ fontSize: '1.1rem', marginBottom: '10px' }}>
              Email : <span className="text-cyan">sifatabir2001@gmail.com</span>
            </p>
          </motion.div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="label-copy">Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter name"
                  className="input-copy"
                  required
                />
              </div>

              <div className="form-group">
                <label className="label-copy">Email address</label>
                <input 
                  type="email" 
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  className="input-copy"
                  required
                />
              </div>

              <div className="form-group">
                <label className="label-copy">Message</label>
                <textarea 
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Message"
                  className="input-copy"
                  rows="4"
                  required
                ></textarea>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <button type="submit" disabled={status.loading} className="btn-copy" style={{ minWidth: '150px' }}>
                  {status.loading ? "SENDING..." : "SEND"}
                </button>

                <AnimatePresence>
                  {status.message && (
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      style={{ marginTop: '15px', color: status.error ? '#ff4d4d' : 'var(--primary)', fontSize: '0.9rem' }}
                    >
                      {status.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}