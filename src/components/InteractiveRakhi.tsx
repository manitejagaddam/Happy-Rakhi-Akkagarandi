import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hand, Heart, Sparkles, Star } from 'lucide-react';

interface InteractiveRakhiProps {
  onComplete: () => void;
}

const InteractiveRakhi: React.FC<InteractiveRakhiProps> = ({ onComplete }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [rakhiPosition, setRakhiPosition] = useState({ x: 50, y: 300 });
  const [isComplete, setIsComplete] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showBlast, setShowBlast] = useState(false);
  const [balloons, setBalloons] = useState<Array<{
    id: number;
    x: number;
    color: string;
    delay: number;
  }>>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const createBalloons = () => {
    const newBalloons = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: ['#FF6B9D', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3'][Math.floor(Math.random() * 6)],
      delay: Math.random() * 2,
    }));
    setBalloons(newBalloons);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    
    // Check if rakhi is near the wrist area
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (containerRect) {
      const relativeX = (rakhiPosition.x / containerRect.width) * 100;
      const relativeY = (rakhiPosition.y / containerRect.height) * 100;
      
      // More forgiving hit detection
      if (relativeX > 60 && relativeX < 90 && relativeY > 40 && relativeY < 70) {
        setShowBlast(true);
        createBalloons();
        
        setTimeout(() => {
          setIsComplete(true);
          setShowMessage(true);
          onComplete();
        }, 1000);
        
        // Hide blast after animation
        setTimeout(() => setShowBlast(false), 3000);
        
        // Auto-hide message after 8 seconds
        setTimeout(() => setShowMessage(false), 8000);
      }
    }
  };

  const handleDrag = (event: any, info: any) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (containerRect) {
      setIsComplete(true);
      setShowMessage(true);
      onComplete();
      
      // Auto-hide message after 5 seconds
      setTimeout(() => setShowMessage(false), 5000);
      setRakhiPosition({
        x: info.point.x - containerRect.left,
        y: info.point.y - containerRect.top
      });
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-3xl mb-12">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h2 
            className="text-4xl md:text-5xl font-bold text-yellow-800 mb-4"
            style={{ fontFamily: 'Dancing Script, cursive' }}
          >
            Tie the Rakhi
          </h2>
          <p className="text-lg text-yellow-700">
            {isComplete ? 'Perfect! You tied it beautifully! 🎉' : 'Drag the rakhi to my wrist to complete the ceremony 💝'}
          </p>
        </motion.div>

        <div 
          ref={containerRef}
          className="relative w-full h-96 bg-gradient-to-b from-blue-200 to-green-200 rounded-2xl overflow-hidden"
          style={{ perspective: '1000px' }}
        >
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-20">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                animate={{
                  x: [Math.random() * 800, Math.random() * 800],
                  y: [Math.random() * 400, Math.random() * 400],
                  scale: [0.5, 1.5, 0.5],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Hand illustration */}
          <motion.div
            className="absolute right-20 top-1/2 transform -translate-y-1/2"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="relative">
              <Hand className="w-32 h-32 text-amber-700 rotate-12" />
              
              {/* Wrist target area */}
              <motion.div
                className="absolute -left-8 top-16 w-16 h-8 border-2 border-dashed border-pink-400 rounded-full"
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: isComplete ? 0 : [0.5, 1, 0.5]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* Rakhi on wrist when complete */}
              <AnimatePresence>
                {isComplete && (
                  <motion.div
                    initial={{ scale: 0, rotate: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    className="absolute -left-8 top-16 w-16 h-16 flex items-center justify-center"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full border-4 border-yellow-400 flex items-center justify-center">
                      <Heart className="w-4 h-4 text-white fill-current" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Draggable Rakhi */}
          {!isComplete && (
            <motion.div
              drag
              dragConstraints={containerRef}
              dragElastic={0.1}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={handleDragEnd}
              onDrag={handleDrag}
              className="absolute cursor-grab active:cursor-grabbing"
              style={{ 
                left: rakhiPosition.x, 
                top: rakhiPosition.y,
                transform: 'translate(-50%, -50%)'
              }}
              whileDrag={{ scale: 1.2, rotate: 15 }}
              whileHover={{ scale: 1.1 }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full border-4 border-yellow-400 flex items-center justify-center shadow-lg">
                <Heart className="w-6 h-6 text-white fill-current" />
                
                {/* Decorative elements */}
                <div className="absolute -inset-2">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-yellow-300 rounded-full"
                      style={{
                        top: '50%',
                        left: '50%',
                        transform: `rotate(${i * 45}deg) translate(30px, -4px)`,
                        transformOrigin: '0 0',
                      }}
                    />
                  ))}
                </div>
              </div>
              
              {/* Drag trail effect */}
              {isDragging && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-pink-300"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0, 0.8] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </motion.div>
          )}

          {/* Instructions */}
          {!isComplete && (
            <motion.div
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="bg-white bg-opacity-90 rounded-lg px-4 py-2 text-yellow-800 font-medium">
                Drag me to the wrist! ✨
              </div>
            </motion.div>
          )}
        </div>

        {/* Success Message */}
        <AnimatePresence>
          {showMessage && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.8 }}
              className="mt-8 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-2xl p-6 text-center shadow-xl"
            >
              <Sparkles className="w-8 h-8 mx-auto mb-3" />
              <h3 
                className="text-2xl font-bold mb-2"
                style={{ fontFamily: 'Dancing Script, cursive' }}
              >
                🎉 AMAZING! 🎉
              </h3>
              <p className="text-lg leading-relaxed">
                WOW! You tied the rakhi perfectly! 🎊 
                Look at those beautiful balloons floating up to celebrate our bond! 
                Your love and protection mean everything to me. 
                I promise to always cherish and protect you too, my amazing sister! 
                Happy Raksha Bandhan! 💕✨
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default InteractiveRakhi;