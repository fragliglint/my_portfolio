// file: components/Footer.js
"use client";
import { motion } from "framer-motion";
import {
  FiHeart,
  FiCoffee,
  FiCode,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiFacebook,
  FiInstagram
} from "react-icons/fi";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FiGithub, href: "https://github.com/fragliglint" },
    { icon: FiLinkedin, href: "https://bd.linkedin.com/in/sifat-noor-siam-953650206" },
    { icon: FiFacebook, href: "https://www.facebook.com/Siamabir368" },
    { icon: FiInstagram, href: "https://www.instagram.com/fragliglint/" },
  ];

  return (
    <footer className="main-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <FiCode size={24} />
              <span>Sifat Noor Siam</span>
            </div>
            <p className="footer-description">
              Full Stack Developer & AI Engineer dedicated to building high-performance 
              applications with a focus on intelligent user experiences.
            </p>
            <div className="footer-socials">
              {socialLinks.map((social, i) => (
                <a key={i} href={social.href} className="footer-social-btn glass">
                  <social.icon />
                </a>
              ))}
            </div>
          </div>

          <div className="footer-links-group">
            <h3>Quick Links</h3>
            <a href="#home" className="footer-link">Home</a>
            <a href="#about" className="footer-link">About</a>
            <a href="#projects" className="footer-link">Projects</a>
            <a href="#contact" className="footer-link">Contact</a>
          </div>

          <div className="footer-links-group">
            <h3>Get in Touch</h3>
            <div className="contact-item">
              <FiMail />
              <span>sifatabir2001@gmail.com</span>
            </div>
            <div className="contact-item">
              <FiMapPin />
              <span>Dhaka, Bangladesh</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {currentYear} Sifat Noor Siam. All rights reserved.</p>
          <div className="footer-meta">
            <span className="craft">
              Crafted with <FiHeart className="heart" /> and <FiCoffee className="coffee" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
