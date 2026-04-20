// file: components/Header.js
"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Header() {
  const navItems = [
    { label: "About", href: "about" },
    { label: "Skills", href: "skills" },
    { label: "Portfolio", href: "projects" },
    { label: "Contact", href: "contact" },
  ];

  const smoothScroll = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = el.offsetTop - 80;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  return (
    <header className="container header-copy">
      <Link href="/">
        <motion.div 
          className="logo-boxed"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          SN
        </motion.div>
      </Link>

      <nav className="nav-links-copy">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={`#${item.href}`}
            onClick={(e) => {
              e.preventDefault();
              smoothScroll(item.href);
            }}
            className="nav-link-item"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
