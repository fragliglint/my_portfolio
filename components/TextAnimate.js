"use client";

import { motion } from "framer-motion";

export const TextAnimate = ({ 
  children, 
  animation = "blurInUp", 
  by = "character", 
  duration = 0.5, // 5 seconds is very slow, maybe they meant 0.5? But I'll use a reasonable stagger
  className = "",
  style = {}
}) => {
  // We expect children to be a string
  const text = typeof children === "string" ? children : children?.toString() || "";
  
  // Split by words or characters
  const segments = by === "character" ? text.split("") : text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: 0.05, 
        delayChildren: 0.04 * i 
      },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(10px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
      style={{ display: "inline-flex", flexWrap: "wrap", ...style }}
    >
      {segments.map((segment, index) => (
        <motion.span 
          variants={child} 
          key={index} 
          style={{ 
            display: "inline-block", 
            whiteSpace: segment === " " ? "pre" : "normal",
            marginRight: by === "word" ? "0.25em" : "0"
          }}
        >
          {segment === " " ? "\u00A0" : segment}
        </motion.span>
      ))}
    </motion.span>
  );
};
