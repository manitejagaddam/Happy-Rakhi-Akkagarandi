import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Star } from 'lucide-react';

const PersonalizedLetter: React.FC = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const letterContent = `My Dearest Sister,

You’re not just my sister — you’re my best friend, my safe place, and my biggest supporter. From childhood laughs to grown-up challenges, you’ve always been my guiding light.

I love you more than words can say, and I can do anything for you — anytime, anywhere. Distance, time, or anything else will never break our bond.

On this Raksha Bandhan, just know you are my forever priority, and I’m always here for you.

With all my love,
Your lil brother ❤️`;

  const startTypewriter = () => {
    setIsTyping(true);
    setCurrentIndex(0);
    setDisplayedText('');
  };

  useEffect(() => {
    if (isTyping && currentIndex < letterContent.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + letterContent[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 50);

      return () => clearTimeout(timer);
    } else if (currentIndex >= letterContent.length) {
      setIsTyping(false);
    }
  }, [currentIndex, isTyping, letterContent]);

  return (
    <section className="py-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl mb-12">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h2 
            className="text-4xl md:text-5xl font-bold text-purple-800 mb-4"
            style={{ fontFamily: 'Dancing Script, cursive' }}
          >
            A Letter Just For You
          </h2>
          <p className="text-lg text-purple-600 mb-6">
            Something special, straight from my heart
          </p>
          
          {!isTyping && displayedText === '' && (
            <motion.button
              onClick={startTypewriter}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Read Your Letter ✉️
            </motion.button>
          )}
        </motion.div>

        {(isTyping || displayedText) && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            {/* Paper background */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
              {/* Paper texture overlay */}
              <div className="absolute inset-0 opacity-10">
                <div className="w-full h-full bg-gradient-to-br from-amber-200 to-yellow-200" 
                     style={{
                       backgroundImage: `radial-gradient(circle at 20% 50%, transparent 20%, rgba(255,255,255,0.3) 21%, rgba(255,255,255,0.3) 34%, transparent 35%), 
                                       linear-gradient(0deg, rgba(255,255,255,0.1) 50%, transparent 50%)`
                     }} />
              </div>

              {/* Decorative elements */}
              <div className="absolute top-4 right-4">
                <Heart className="w-6 h-6 text-pink-300" />
              </div>
              <div className="absolute top-4 left-4">
                <Star className="w-6 h-6 text-yellow-400" />
              </div>
              <div className="absolute bottom-4 right-4">
                <Star className="w-6 h-6 text-purple-300" />
              </div>
              <div className="absolute bottom-4 left-4">
                <Heart className="w-6 h-6 text-rose-300" />
              </div>

              {/* Letter content */}
              <div className="relative z-10">
                <pre 
                  className="font-serif text-gray-800 text-base md:text-lg leading-relaxed whitespace-pre-wrap"
                  style={{ 
                    fontFamily: 'Georgia, serif',
                    lineHeight: '1.8'
                  }}
                >
                  {displayedText}
                  {isTyping && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="text-purple-500"
                    >
                      |
                    </motion.span>
                  )}
                </pre>

                {!isTyping && displayedText && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="mt-8 flex justify-center space-x-4"
                  >
                    <div className="flex space-x-2">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 1 + i * 0.1 }}
                        >
                          <Heart className="w-6 h-6 text-red-400 fill-current" />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PersonalizedLetter;