// file: components/SectionObserver.js (Simplified version)
"use client";
import { useEffect } from "react";

export default function SectionObserver({
  selector = ".fade-in-up",
  threshold = 0.15,
  activeClass = "show",
  triggerOnce = true
} = {}) {
  useEffect(() => {
    let elements;
    try {
      elements = document.querySelectorAll(selector);
    } catch (error) {
      console.error('SectionObserver: Invalid selector', error);
      return;
    }

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(activeClass);
            if (triggerOnce) {
              observer.unobserve(entry.target);
            }
          } else if (!triggerOnce) {
            entry.target.classList.remove(activeClass);
          }
        });
      },
      { 
        threshold: threshold,
        rootMargin: '0px 0px -10% 0px' // Trigger when 10% of element is visible
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [selector, threshold, activeClass, triggerOnce]);

  return null;
}