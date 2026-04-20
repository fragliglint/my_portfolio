// 📄 File: app/privacy/page.js
"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FiShield,
  FiDatabase,
  FiUserCheck,
  FiLock,
  FiClock,
  FiLayers,
  FiGlobe,
  FiArrowLeft
} from "react-icons/fi";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const privacySections = [
  {
    id: "intro",
    icon: FiShield,
    title: "Your Privacy Matters",
    content: "At Sifat Noor Siam’s Portfolio, your data security and privacy are top priorities. This page explains how your information is collected, used, and protected.",
    points: [
      "We respect your right to privacy and transparency.",
      "You have full control over any personal information shared.",
      "Data is only used to enhance your browsing experience.",
    ],
  },
  {
    id: "collection",
    icon: FiDatabase,
    title: "Information Collection",
    content: "We only collect the necessary information to improve this portfolio’s functionality and experience.",
    points: [
      "Basic analytics data (like page views and visit duration).",
      "Information you voluntarily submit through contact forms.",
      "No sensitive or financial data is ever collected.",
    ],
  },
  {
    id: "usage",
    icon: FiGlobe,
    title: "How Information Is Used",
    content: "Collected data helps us personalize and enhance your browsing experience.",
    points: [
      "Improving website performance and UI.",
      "Responding to inquiries or collaboration requests.",
      "Analyzing traffic to optimize content delivery.",
    ],
  },
  {
    id: "cookies",
    icon: FiLayers,
    title: "Cookies & Tracking",
    content: "This site may use cookies to ensure a smooth and responsive user experience.",
    points: [
      "Cookies are small text files stored on your device.",
      "They help remember your preferences and settings.",
      "You can disable cookies anytime in your browser settings.",
    ],
  },
  {
    id: "security",
    icon: FiLock,
    title: "Data Security",
    content: "We use modern security measures to protect your data against unauthorized access, alteration, or destruction.",
    points: [
      "Data is transmitted using HTTPS encryption.",
      "We regularly review security practices to ensure safety.",
      "No user data is shared with third parties without consent.",
    ],
  },
  {
    id: "rights",
    icon: FiUserCheck,
    title: "Your Rights",
    content: "You have the right to know, access, and delete any information related to your usage of this portfolio.",
    points: [
      "Request access or deletion of your data anytime.",
      "Opt out of analytics tracking easily.",
      "Receive transparency about data handling procedures.",
    ],
  },
  {
    id: "updates",
    icon: FiClock,
    title: "Policy Updates",
    content: "This Privacy Policy may be updated periodically. The latest version will always be available on this page.",
    points: [
      "Last updated date will be displayed below.",
      "Significant changes will be communicated clearly.",
      "You are encouraged to review this policy regularly.",
    ],
  },
];

const PrivacyCard = ({ section, index }) => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const Icon = section.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="glass p-8 rounded-3xl"
    >
      <div className="flex gap-6">
        <div className="info-icon flex-shrink-0">
          <Icon size={24} />
        </div>
        <div>
          <h3 className="project-title mb-2" style={{ fontSize: '1.25rem' }}>{section.title}</h3>
          <p className="project-desc mb-4">{section.content}</p>
          <ul className="flex flex-col gap-2">
            {section.points.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default function PrivacyPolicy() {
  return (
    <div className="body-main">
      <Header />
      <div className="bg-decor"></div>
      
      <main id="main-content" className="section">
        <div className="container" style={{ maxWidth: '900px' }}>
          <Link href="/" className="btn btn-secondary mb-12">
            <FiArrowLeft className="mr-2" /> Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-header"
            style={{ textAlign: 'left', margin: '0 0 4rem 0' }}
          >
            <div className="tag">Legal</div>
            <h1 className="section-title">Privacy <span className="gradient-text">Policy</span></h1>
            <p className="section-desc">
              Your trust is important to us. Learn how we handle your data with transparency and care.
            </p>
          </motion.div>

          <div className="flex flex-col gap-6">
            {privacySections.map((section, index) => (
              <PrivacyCard key={section.id} section={section} index={index} />
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-glass text-center text-muted text-sm">
            <p>© {new Date().getFullYear()} Sifat Noor Siam. All Rights Reserved.</p>
            <p className="mt-2">Last updated: October 2025</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
