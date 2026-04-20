// file: components/Contact.js
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
  FiCheck,
  FiAlertCircle,
  FiGithub,
  FiLinkedin,
  FiFacebook,
  FiUser,
  FiMessageCircle
} from "react-icons/fi";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "", honeypot: "" });
  const [status, setStatus] = useState({ loading: false, message: null, error: false });
  const [touched, setTouched] = useState({ name: false, email: false, message: false });

  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.honeypot) return;

    setStatus({ loading: true, message: null, error: false });
    // Simulate API call for now or use the actual one if it exists
    setTimeout(() => {
       setStatus({ 
         loading: false, 
         message: "Thank you! Your message has been sent.", 
         error: false 
       });
       setForm({ name: "", email: "", message: "", honeypot: "" });
    }, 1500);
  };

  const contactInfo = [
    { icon: FiMail, label: "Email", value: "sifatabir2001@gmail.com", href: "mailto:sifatabir2001@gmail.com" },
    { icon: FiPhone, label: "Phone", value: "+880 1832-854353", href: "tel:+8801832854353" },
    { icon: FiMapPin, label: "Location", value: "Dhaka, Bangladesh", href: "#" },
  ];

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <motion.div
           ref={ref}
           initial={{ opacity: 0, y: 30 }}
           animate={inView ? { opacity: 1, y: 0 } : {}}
           className="section-header"
        >
          <div className="tag">Contact</div>
          <h2 className="section-title">Get In <span className="gradient-text">Touch</span></h2>
          <p className="section-desc">Have a project in mind? Let's discuss how we can work together.</p>
        </motion.div>

        <div className="contact-grid">
          {/* Info Side */}
          <div className="contact-info">
             <h3 className="info-title">Global Connectivity</h3>
             <p className="info-text">I'm available for remote work and collaborations worldwide.</p>
             
             <div className="info-cards">
                {contactInfo.map((info, i) => (
                  <a href={info.href} key={i} className="info-card glass">
                    <div className="info-icon"><info.icon /></div>
                    <div className="info-details">
                      <span>{info.label}</span>
                      <p>{info.value}</p>
                    </div>
                  </a>
                ))}
             </div>

             <div className="contact-socials">
                <a href="#" className="social-btn glass"><FiGithub /></a>
                <a href="#" className="social-btn glass"><FiLinkedin /></a>
                <a href="#" className="social-btn glass"><FiFacebook /></a>
             </div>
          </div>

          {/* Form Side */}
          <div className="contact-form-wrapper glass">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label className="form-label">Name</label>
                <div className="input-wrapper">
                  <FiUser className="input-icon" />
                  <input 
                    type="text" 
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your Name" 
                    className="form-input" 
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <div className="input-wrapper">
                  <FiMail className="input-icon" />
                  <input 
                    type="email" 
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email Address" 
                    className="form-input" 
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Message</label>
                <div className="input-wrapper">
                  <FiMessageCircle className="input-icon area" />
                  <textarea 
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..." 
                    className="form-input form-area"
                    rows="5"
                  ></textarea>
                </div>
              </div>

              <button type="submit" disabled={status.loading} className="btn btn-primary submit-btn">
                {status.loading ? "Sending..." : "Send Message"} <FiSend />
              </button>

              <AnimatePresence>
                {status.message && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`form-status ${status.error ? 'error' : 'success'}`}
                  >
                    {status.error ? <FiAlertCircle /> : <FiCheck />}
                    {status.message}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}