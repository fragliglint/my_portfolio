// file: components/SocialSidebar.js
"use client";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiTwitter, FiFacebook, FiInstagram } from "react-icons/fi";

export default function SocialSidebar() {
  const socials = [
    { icon: FiLinkedin, href: "https://bd.linkedin.com/in/sifat-noor-siam-953650206" },
    { icon: FiGithub, href: "https://github.com/fragliglint" },
    { icon: FiInstagram, href: "https://www.instagram.com/fragliglint/" },
    { icon: FiFacebook, href: "https://www.facebook.com/Siamabir368" },
  ];

  return (
    <div className="social-sidebar">
      {socials.map((social, i) => (
        <motion.a
          key={i}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon-link"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 + i * 0.1 }}
          whileHover={{ y: -3 }}
        >
          <social.icon />
        </motion.a>
      ))}
    </div>
  );
}
