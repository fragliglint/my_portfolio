// file: components/Header.js
"use client";
import { useEffect, useState, useCallback } from "react";
import Navbar from "./Navbar";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 100 && !isMobileMenuOpen) {
      setIsVisible(false);
    } else if (currentScrollY < lastScrollY || currentScrollY < 100) {
      setIsVisible(true);
    }
    setScrolled(currentScrollY > 20);
    setLastScrollY(currentScrollY);
  }, [lastScrollY, isMobileMenuOpen]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Accessibility Skip Link
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <AnimatePresence>
        {isVisible && (
          <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className={`main-header ${scrolled ? "scrolled" : ""}`}
          >
            <div className="container header-container">
              {/* Logo Section */}
              <motion.div
                className="logo-wrapper"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="logo-box">
                  {logoError ? (
                    <div className="logo-placeholder">SNS</div>
                  ) : (
                    <img
                      src="/logo.png"
                      alt="Logo"
                      className="logo-img"
                      onError={() => setLogoError(true)}
                    />
                  )}
                </div>
              </motion.div>

              {/* Navigation & Actions */}
              <div className="header-actions">
                {/* CV Button */}
                <motion.a
                  href="/CV_SIAM.pdf"
                  download="CV_Sifat_Noor_Siam.pdf"
                  className="btn btn-primary cv-btn"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Download CV</span>
                </motion.a>

                <Navbar
                  isMobileMenuOpen={isMobileMenuOpen}
                  setIsMobileMenuOpen={setIsMobileMenuOpen}
                />
              </div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>
    </>
  );
}
