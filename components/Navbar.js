// file: components/Navbar.js
"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeSwitcher from "./ThemeSwitcher";
import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiHome,
  FiUser,
  FiBriefcase,
  FiSend,
} from "react-icons/fi";

export default function Navbar({ isMobileMenuOpen, setIsMobileMenuOpen }) {
  const [activeSection, setActiveSection] = useState("home");
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setIsMobileMenuOpen(false);
      }
    };
    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen, setIsMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      const scrollPos = window.scrollY + 120;
      sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute("id");
        if (scrollPos >= top && scrollPos < top + height) {
          setActiveSection(id);
        }
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const smoothScroll = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: offset, behavior: "smooth" });
    setActiveSection(id);
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { label: "Home", href: "home", icon: FiHome },
    { label: "About", href: "about", icon: FiUser },
    { label: "Projects", href: "projects", icon: FiBriefcase },
    { label: "Contact", href: "contact", icon: FiSend },
  ];

  const socialLinks = [
    {
      icon: FiGithub,
      href: "https://github.com/fragliglint",
      label: "GitHub",
    },
    {
      icon: FiLinkedin,
      href: "https://bd.linkedin.com/in/sifat-noor-siam-953650206",
      label: "LinkedIn",
    },
    {
      icon: FiMail,
      href: "mailto:sifatabir2001@gmail.com",
      label: "Email",
    },
  ];

  return (
    <div className="navbar-wrapper">
      {/* Desktop Nav */}
      <nav className="desktop-nav">
        {navItems.map((item) => {
          const isActive = activeSection === item.href;
          return (
            <motion.a
              key={item.href}
              href={`#${item.href}`}
              onClick={(e) => {
                e.preventDefault();
                smoothScroll(item.href);
              }}
              className={`nav-link ${isActive ? "active" : ""}`}
              whileHover={{ y: -2 }}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </motion.a>
          );
        })}

        <div className="nav-divider" />

        <div className="social-links">
          {socialLinks.map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              whileHover={{ scale: 1.1, y: -2 }}
              aria-label={social.label}
            >
              <social.icon size={20} />
            </motion.a>
          ))}
        </div>
      </nav>

      {/* Theme Switcher */}
      <ThemeSwitcher />

      {/* Mobile Toggle */}
      <motion.button
        onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        className="mobile-toggle-btn"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? "✕" : "☰"}
      </motion.button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="mobile-menu-overlay"
              onClick={() => setIsMobileMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              ref={mobileMenuRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="mobile-menu-panel glass"
            >
              <div className="mobile-menu-header">
                <h3>Sifat Noor Siam</h3>
                <p>Available for hire 🚀</p>
              </div>

              <nav className="mobile-nav">
                {navItems.map((item) => {
                  const isActive = activeSection === item.href;
                  return (
                    <motion.a
                      key={item.href}
                      href={`#${item.href}`}
                      onClick={(e) => {
                        e.preventDefault();
                        smoothScroll(item.href);
                      }}
                      className={`mobile-nav-link ${isActive ? "active" : ""}`}
                    >
                      <item.icon size={20} />
                      <span>{item.label}</span>
                    </motion.a>
                  );
                })}
              </nav>

              <div className="mobile-socials">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mobile-social-link"
                    whileHover={{ scale: 1.1 }}
                  >
                    <social.icon size={22} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
