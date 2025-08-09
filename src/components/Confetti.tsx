import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Confetti: React.FC = () => {
  const [confettiPieces, setConfettiPieces] = useState<Array<{
    id: number;
    x: number;
    color: string;
    size: number;
    delay: number;
  }>>([]);

  useEffect(() => {
    const pieces = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      color: ['#FF6B9D', '#F9A826', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57'][Math.floor(Math.random() * 6)],
      size: Math.random() * 8 + 4,
      delay: Math.random() * 3,
    }));
    
    setConfettiPieces(pieces);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {confettiPieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute rounded-full"
          style={{
            backgroundColor: piece.color,
            width: piece.size,
            height: piece.size,
            left: piece.x,
            top: -20,
          }}
          initial={{ y: -20, rotate: 0, opacity: 1 }}
          animate={{
            y: window.innerHeight + 20,
            rotate: 720,
            opacity: 0,
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: piece.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;