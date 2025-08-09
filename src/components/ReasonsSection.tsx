import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, Gift, Smile, Coffee, Music } from 'lucide-react';

const ReasonsSection: React.FC = () => {
  const [flippedCard, setFlippedCard] = useState<number | null>(null);

  const reasons = [
    {
      icon: Heart,
      title: 'Unconditional Love',
      front: 'You love me even when I\'m being annoying',
      back: 'Through every mistake and triumph, your love never wavers. That\'s true sister magic! 💕'
    },
    {
      icon: Gift,
      title: 'Sharing is Caring',
      front: 'You still share your fries with me',
      back: 'Even when you\'re mad at me, you\'ll still give me the last bite. That\'s love in its purest form! 🍟'
    },
    {
      icon: Smile,
      title: 'Laughter Therapy',
      front: 'You make me laugh until my stomach hurts',
      back: 'Your silly jokes and weird faces can turn any bad day into the best day ever! 😂'
    },
    {
      icon: Star,
      title: 'My Biggest Cheerleader',
      front: 'You believe in me more than I believe in myself',
      back: 'When everyone doubts, you\'re there cheering the loudest. You see the best in me always! ⭐'
    },
    {
      icon: Coffee,
      title: 'Late Night Talks',
      front: 'Our 3 AM conversations solve everything',
      back: 'From heartbreaks to life dreams, we\'ve figured it all out over midnight snacks and deep talks! ☕'
    },
    {
      icon: Music,
      title: 'Singing Partner for Life',
      front: 'Our kitchen singing sessions are unforgettable 🎶',
      back: 'Only you would sing random songs with me, laugh at our own voices, and turn an ordinary day into a mini concert. You’re my forever duet partner, Akkagarandi! 💃❤️'  
    }
  ];

  return (
    <section className="py-16 mb-12">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 
            className="text-4xl md:text-5xl font-bold text-orange-800 mb-4"
            style={{ fontFamily: 'Dancing Script, cursive' }}
          >
            Why You're Simply The Best
          </h2>
          <p className="text-lg text-orange-600">Click each card to discover why you're amazing!</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => {
            const IconComponent = reason.icon;
            const isFlipped = flippedCard === index;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative h-64 cursor-pointer group"
                onClick={() => setFlippedCard(isFlipped ? null : index)}
              >
                <motion.div
                  className="relative w-full h-full preserve-3d"
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Front of card */}
                  <div
                    className="absolute inset-0 backface-hidden bg-gradient-to-br from-orange-300 to-pink-300 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-xl group-hover:shadow-2xl transition-shadow duration-300"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                      className="mb-4"
                    >
                      <IconComponent className="w-16 h-16 text-white" />
                    </motion.div>
                    
                    <h3 
                      className="text-xl font-bold text-white mb-3"
                      style={{ fontFamily: 'Pacifico, cursive' }}
                    >
                      {reason.title}
                    </h3>
                    
                    <p className="text-white text-lg font-medium">
                      {reason.front}
                    </p>
                    
                    <div className="mt-4 text-white text-sm opacity-80">
                      Click to reveal more ✨
                    </div>
                  </div>

                  {/* Back of card */}
                  <div
                    className="absolute inset-0 backface-hidden bg-gradient-to-br from-pink-400 to-rose-400 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-xl"
                    style={{ 
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                  >
                    <IconComponent className="w-12 h-12 text-white mb-4" />
                    
                    <p className="text-white text-lg leading-relaxed">
                      {reason.back}
                    </p>
                    
                    <div className="mt-4 text-white text-sm opacity-80">
                      Click to flip back 💫
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ReasonsSection;