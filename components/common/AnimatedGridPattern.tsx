"use client";

import { motion } from "framer-motion";

interface AnimatedGridPatternProps {
  width?: number;
  height?: number;
  className?: string;
  numSquares?: number;
  maxOpacity?: number;
  duration?: number;
}

export const AnimatedGridPattern: React.FC<AnimatedGridPatternProps> = ({
  width = 32,
  height = 32,
  className = "",
  numSquares = 30,
  maxOpacity = 0.3,
  duration = 6,
}) => {
  const squares = Array.from({ length: numSquares }, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 20 + 10,
  }));

  return (
    <svg
      className={className}
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        backgroundSize: `${width}px ${height}px`,
        backgroundImage:
          "linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
      }}
    >
      {squares.map((square, index) => (
        <motion.rect
          key={index}
          initial={{
            x: `${square.x}%`,
            y: `${square.y}%`,
            opacity: 0,
          }}
          animate={{
            opacity: [0, maxOpacity, 0],
          }}
          transition={{
            duration: duration,
            repeat: Infinity,
            delay: Math.random() * duration,
          }}
          width={square.size}
          height={square.size}
        />
      ))}
    </svg>
  );
};
