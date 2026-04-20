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
  FiCookie,
  FiGlobe,
} from "react-icons/fi";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

// 🧩 Privacy Sections Data
const privacySections = [
  {
    id: "intro",
    icon: FiShield,
    title: "Your Privacy Matters",
    content:
      "At Sifat Noor Siam’s Portfolio, your data security and privacy are top priorities. This page explains how your information is collected, used, and protected.",
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
    content:
      "We only collect the necessary information to improve this portfolio’s functionality and experience.",
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
    content:
      "Collected data helps us personalize and enhance your browsing experience.",
    points: [
      "Improving website performance and UI.",
      "Responding to inquiries or collaboration requests.",
      "Analyzing traffic to optimize content delivery.",
    ],
  },
  {
    id: "cookies",
    icon: FiCookie,
    title: "Cookies & Tracking",
    content:
      "This site may use cookies to ensure a smooth and responsive user experience.",
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
    content:
      "We use modern security measures to protect your data against unauthorized access, alteration, or destruction.",
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
    content:
      "You have the right to know, access, and delete any information related to your usage of this portfolio.",
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
    content:
      "This Privacy Policy may be updated periodically. The latest version will always be available on this page.",
    points: [
      "Last updated date will be displayed below.",
      "Significant changes will be communicated clearly.",
      "You are encouraged to review this policy regularly.",
    ],
  },
];

// 🧱 Privacy Section Component
const PrivacySection = ({ section, index }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const Icon = section.icon || FiShield;

  return (
    <motion.div
      ref={ref}
      id={section.id}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-effect rounded-3xl p-8 group scroll-mt-24"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
          <Icon className="text-white" size={24} />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
            {section.title}
          </h3>
          <p className="text-gray-600 mb-4">{section.content}</p>
          <ul className="space-y-2 text-sm text-gray-600">
            {section.points.map((p, i) => (
              <li key={i} className="flex gap-2">
                <span className="w-2 h-2 mt-2 bg-blue-500 rounded-full flex-shrink-0" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

// 🌐 Main Privacy Page Component
export default function PrivacyPolicy() {
  return (
    <>
      <Header />

      <main className="min-h-screen py-20 px-6 md:px-16 bg-gradient-to-b from-white to-gray-50">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Learn how Sifat Noor Siam’s Portfolio collects, uses, and protects
            your information responsibly and securely.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-12">
          {privacySections.map((section, index) => (
            <PrivacySection key={section.id} section={section} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-20 text-center text-gray-500 text-sm"
        >
          <p>© {new Date().getFullYear()} Sifat Noor Siam. All Rights Reserved.</p>
          <p>Last updated: October 2025</p>
        </motion.div>
      </main>

      <Footer />
    </>
  );
}
