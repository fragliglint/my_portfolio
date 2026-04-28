"use client";
import React, { useMemo, useState, useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";
import { 
  FaReact, FaPython, FaJs, FaPhp, FaDatabase, 
  FaJava, FaNodeJs, FaLaravel, FaHtml5, FaGithub,
  FaRocket, FaSatellite
} from "react-icons/fa";

// Background Stars Component
const Stars = () => {
  const stars = useMemo(() => {
    return Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, 
      y: Math.random() * 100, 
      size: Math.random() * 2 + 1, 
      opacity: Math.random() * 0.5 + 0.2,
      duration: Math.random() * 3 + 2,
    }));
  }, []);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', borderRadius: '20px' }}>
      {stars.map(star => (
        <motion.div
          key={star.id}
          style={{
            position: 'absolute',
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: 'var(--text-main)',
            borderRadius: '50%',
            opacity: star.opacity,
          }}
          animate={{ opacity: [star.opacity, star.opacity * 0.2, star.opacity] }}
          transition={{ duration: star.duration, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
};

// Falling / Shooting Stars Component
const ShootingStars = () => {
  const shootingStars = useMemo(() => {
    return Array.from({ length: 4 }).map((_, i) => ({
      id: `shooting-${i}`,
      // Randomly spawn across the top/left to fall down/right
      left: Math.random() * 100 - 20, 
      top: Math.random() * -50, 
      duration: Math.random() * 1.5 + 1.5, // fast flight time
      delay: Math.random() * 5 + Math.random() * 5, // random wait between flights
    }));
  }, []);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', borderRadius: '20px' }}>
      {shootingStars.map((star) => (
        <motion.div
          key={star.id}
          style={{
            position: 'absolute',
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: '150px',
            height: '2px',
            // Transparent tail on left, solid head on right
            background: 'linear-gradient(90deg, transparent 0%, var(--text-main) 100%)',
            filter: 'blur(1px)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
          initial={{ x: 0, y: 0, rotate: 45, opacity: 0 }}
          animate={{ 
            x: [0, 1000], 
            y: [0, 1000], 
            opacity: [0, 1, 0] 
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            repeatDelay: star.delay,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

// Random Flying Rocket Component
const RandomRocket = () => {
  const [path, setPath] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const generatePath = (startX = null, startY = null) => {
    let sx = startX;
    let sy = startY;
    
    // If not given a start point (not dropped by user), start off-screen
    if (sx === null || sy === null) {
      sx = Math.random() < 0.5 ? -300 : 800;
      sy = Math.random() * 700 - 100;
      // Immediately set internal motion values so it jumps off-screen instantly
      x.set(sx);
      y.set(sy);
    }
    
    // Pick a random destination off-screen
    const edges = [
      { x: -300, y: Math.random() * 700 - 100 },
      { x: 800, y: Math.random() * 700 - 100 },
      { x: Math.random() * 800 - 150, y: -200 },
      { x: Math.random() * 800 - 150, y: 700 },
    ];
    const end = edges[Math.floor(Math.random() * edges.length)];
    
    const dx = end.x - sx;
    const dy = end.y - sy;
    
    // Calculate angle: FaRocket points Top-Right (-45 deg naturally).
    // Adding 45 aligns its nose perfectly with the flight path trajectory.
    const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 45;
    
    // Calculate duration based on distance so speed is roughly constant
    const distance = Math.sqrt(dx * dx + dy * dy);
    const duration = distance / 120; // 120 pixels per second
    
    setPath({ endX: end.x, endY: end.y, angle, duration });
  };

  useEffect(() => {
    generatePath();
  }, []);

  const handleDragStart = () => setIsDragging(true);
  
  const handleDragEnd = () => {
    setIsDragging(false);
    // Generate new path from the dropped position!
    generatePath(x.get(), y.get());
  };

  if (!path) return null;

  return (
    <motion.div
      drag
      dragMomentum={false}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 50,
        x,
        y
      }}
      animate={isDragging ? { rotate: path.angle } : { x: path.endX, y: path.endY, rotate: path.angle }}
      transition={
        isDragging 
          ? { rotate: { duration: 0.3 } } // Fast rotation when dragging
          : { 
              duration: path.duration, 
              ease: 'linear',
              rotate: { duration: 0.5 } // Smooth rotation towards new trajectory
            }
      }
      onAnimationComplete={() => {
        if (!isDragging) {
           // Once it finishes flying to destination, pick a new path
           generatePath();
        }
      }}
    >
      {/* Node styled like a planet */}
      <motion.div
        whileHover={{
          borderColor: 'var(--primary, #00D1FF)',
          color: 'var(--primary, #00D1FF)',
          scale: 1.2,
          boxShadow: '0 0 15px rgba(0, 209, 255, 0.3)'
        }}
        style={{ 
          position: 'relative',
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          background: 'transparent',
          border: 'none',
          color: 'var(--text-secondary)',
          fontSize: '1.2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'none',
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
      >
        <FaRocket />
        
        {/* Fire Trail */}
        <motion.div 
          style={{
            position: 'absolute',
            bottom: '-4px',
            left: '-4px',
            width: '14px',
            height: '14px',
            background: '#ff4500',
            borderRadius: '50%',
            filter: 'blur(3px)',
            zIndex: -1
          }}
          animate={{ scale: [1, 1.8, 1], opacity: [0.9, 0.3, 0.9] }}
          transition={{ duration: 0.15, repeat: Infinity }}
        />
        
        {/* Smoke Trail */}
        <motion.div 
          style={{
            position: 'absolute',
            bottom: '-12px',
            left: '-12px',
            width: '10px',
            height: '10px',
            background: '#ffffff',
            borderRadius: '50%',
            filter: 'blur(2px)',
            zIndex: -1
          }}
          animate={{ 
            scale: [1, 2.5, 1], 
            x: [0, -15], 
            y: [0, 15], 
            opacity: [0.7, 0] 
          }}
          transition={{ duration: 0.4, repeat: Infinity }}
        />
      </motion.div>
    </motion.div>
  );
};

const HeroAnimation = () => {
  // Define orbits: radius (px), duration (seconds), nodes
  const orbits = [
    {
      radius: 90,
      duration: 15,
      reverse: false,
      tilt: 0,
      nodes: [
        { icon: <FaPython />, angle: 0 },
        { icon: <FaJs />, angle: 180 },
      ]
    },
    {
      radius: 150,
      duration: 25,
      reverse: true,
      tilt: 0,
      nodes: [
        { icon: <FaPhp />, angle: 45 },
        { icon: <FaDatabase />, angle: 165 },
        { icon: <FaJava />, angle: 285 },
      ]
    },
    {
      radius: 210,
      duration: 35,
      reverse: false,
      tilt: 0,
      nodes: [
        { icon: <FaNodeJs />, angle: 90 },
        { icon: <FaLaravel />, angle: 210 },
        { icon: <FaHtml5 />, angle: 330 },
        { icon: <FaGithub />, angle: 0 },
      ]
    },
    // Satellite Orbit
    {
      radius: 170,
      duration: 20,
      reverse: false,
      tilt: 60, // Inclined orbit for 3D effect
      isObject: true,
      nodes: [
        { icon: <FaSatellite />, angle: 120 },
      ]
    }
  ];

  return (
    <div style={{ width: '100%', height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      
      {/* Background Twinkling Stars */}
      <Stars />
      
      {/* Falling Stars Effect */}
      <ShootingStars />
      
      {/* Randomly Flying Rocket overlay */}
      <RandomRocket />

      {/* 3D System Container */}
      <div style={{ 
        position: 'relative', 
        width: '1px', 
        height: '1px', 
        perspective: '1200px', 
        transformStyle: 'preserve-3d' 
      }}>
        
        {/* Tilted Solar System plane */}
        <div style={{ 
          position: 'absolute', 
          transform: 'rotateX(60deg) rotateY(-10deg)', 
          transformStyle: 'preserve-3d' 
        }}>

          {/* Center Node (React Atom) */}
          <div style={{ position: 'absolute', transformStyle: 'preserve-3d', transform: 'rotateY(10deg) rotateX(-60deg)' }}>
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1, type: "spring" }}
              style={{
                position: 'absolute',
                zIndex: 10,
                top: '-30px',
                left: '-30px',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'var(--bg-surface)',
                border: '1px solid var(--primary)',
                boxShadow: '0 0 25px var(--primary-glow), inset 0 0 10px var(--primary-glow)',
                color: 'var(--text-main)',
                fontSize: '2.2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <FaReact />
            </motion.div>
          </div>

          {/* Orbits and Nodes */}
          {orbits.map((orbit, orbitIndex) => (
            <div 
              key={`orbit-${orbitIndex}`} 
              style={{ 
                position: 'absolute', 
                transformStyle: 'preserve-3d',
                transform: `rotateY(${orbit.tilt}deg)`
              }}
            >
              {/* The Orbit Ring */}
              <motion.div 
                style={{
                  position: 'absolute',
                  top: `${-orbit.radius}px`,
                  left: `${-orbit.radius}px`,
                  borderRadius: '50%',
                  border: orbit.isObject ? '1px dashed var(--orbit-line)' : '1px dashed var(--orbit-line)',
                  width: `${orbit.radius * 2}px`,
                  height: `${orbit.radius * 2}px`,
                  transformStyle: 'preserve-3d'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: orbitIndex * 0.2 }}
              />
              
              {/* The Rotating Arm for Nodes */}
              <motion.div
                style={{
                  position: 'absolute',
                  transformStyle: 'preserve-3d'
                }}
                animate={{ rotateZ: orbit.reverse ? -360 : 360 }}
                transition={{
                  duration: orbit.duration,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                {orbit.nodes.map((node, nodeIndex) => {
                  return (
                    <div
                      key={`node-${orbitIndex}-${nodeIndex}`}
                      style={{ 
                        position: 'absolute',
                        transformStyle: 'preserve-3d',
                        transform: `rotateZ(${node.angle}deg) translateX(${orbit.radius}px)`
                      }}
                    >
                      {/* Counter-rotate Z to keep icons upright during orbit */}
                      <motion.div
                        style={{ transformStyle: 'preserve-3d' }}
                        animate={{ rotateZ: orbit.reverse ? 360 : -360 }}
                        transition={{
                          duration: orbit.duration,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      >
                        {/* 
                          Mathematically cancel all parent 3D rotations so the node 
                          always faces the camera perfectly! 
                        */}
                        <div style={{ 
                          transformStyle: 'preserve-3d',
                          transform: `rotateZ(${-node.angle}deg) rotateY(${-orbit.tilt + 10}deg) rotateX(-60deg)` 
                        }}>
                          <motion.div
                            style={{
                              position: 'absolute',
                              top: orbit.isObject ? '-12px' : '-18px',
                              left: orbit.isObject ? '-12px' : '-18px',
                              width: orbit.isObject ? '24px' : '36px',
                              height: orbit.isObject ? '24px' : '36px',
                              borderRadius: orbit.isObject ? '0' : '50%',
                              background: orbit.isObject ? 'transparent' : 'var(--bg-surface)',
                              border: orbit.isObject ? 'none' : '1px solid var(--border-glass)',
                              color: orbit.isObject ? '#A0E2FF' : 'var(--text-secondary)',
                              fontSize: orbit.isObject ? '1.5rem' : '1rem',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              boxShadow: orbit.isObject ? 'none' : '0 4px 15px rgba(0, 0, 0, 0.1)',
                            }}
                            whileHover={{
                              borderColor: 'var(--primary, #00D1FF)',
                              color: 'var(--primary, #00D1FF)',
                              scale: 1.2,
                              cursor: 'pointer',
                              boxShadow: orbit.isObject ? 'none' : '0 0 15px rgba(0, 209, 255, 0.3)'
                            }}
                          >
                            {node.icon}
                          </motion.div>
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroAnimation;
