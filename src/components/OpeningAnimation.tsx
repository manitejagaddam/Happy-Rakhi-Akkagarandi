import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

interface OpeningAnimationProps {
  onComplete: () => void;
}

const OpeningAnimation: React.FC<OpeningAnimationProps> = ({ onComplete }) => {
  const [stage, setStage] = useState(0);
  const [showGreeting, setShowGreeting] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setStage(1), 1000);
    const timer2 = setTimeout(() => setStage(2), 3000);
    const timer3 = setTimeout(() => setShowGreeting(true), 4000);
    const timer4 = setTimeout(() => onComplete(), 7000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900 flex items-center justify-center overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-300 rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: 3,
              delay: Math.random() * 2,
              repeat: Infinity,
              repeatDelay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Rakhi Animation */}
      <AnimatePresence>
        {stage >= 1 && (
          <motion.div
            className="relative z-10"
            initial={{ scale: 0, rotate: 0 }}
            animate={{ 
              scale: stage >= 2 ? 1.2 : 1, 
              rotate: 360,
            }}
            transition={{ 
              duration: 2,
              ease: "easeInOut"
            }}
          >
            <div className="relative w-32 h-32">
              {/* Outer circle */}
              <motion.div
                className="absolute inset-0 border-4 border-yellow-400 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Inner decorative elements */}
              <motion.div
                className="absolute inset-2 border-2 border-pink-400 rounded-full bg-gradient-to-r from-pink-300 to-rose-300"
                animate={{ rotate: -360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Center heart */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Heart className="w-8 h-8 text-red-500 fill-current" />
              </div>
              
              {/* Decorative dots */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 bg-yellow-400 rounded-full"
                  style={{
                    top: '50%',
                    left: '50%',
                    transformOrigin: '0 0',
                    transform: `rotate(${i * 45}deg) translate(50px, -6px)`,
                  }}
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{
                    duration: 2,
                    delay: i * 0.1,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Greeting Text */}
      <AnimatePresence>
        {showGreeting && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center text-white z-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 1 }}
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-4 text-center"
              style={{ fontFamily: 'Dancing Script, cursive' }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Happy Raksha Bandhan
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-pink-100 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              style={{ fontFamily: 'Pacifico, cursive' }}
            >
              To the most amazing sister ✨
            </motion.p>
            
            <motion.div
              className="mt-8 text-sm text-pink-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 2 }}
            >
              Scroll down for your special journey...
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OpeningAnimation;