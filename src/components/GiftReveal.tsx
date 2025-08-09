import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Heart, Sparkles, ExternalLink } from "lucide-react";

const GiftReveal: React.FC = () => {
  const [isShaking, setIsShaking] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  const handleGiftClick = () => {
    if (isOpened) return;

    setIsShaking(true);
    setTimeout(() => {
      setIsShaking(false);
      setIsOpened(true);
    }, 2000);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-rose-100 to-pink-100 rounded-3xl mb-12">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h2
            className="text-4xl md:text-5xl font-bold text-rose-800 mb-4"
            style={{ fontFamily: "Dancing Script, cursive" }}
          >
            One Last Surprise! 🎁
          </h2>
          <p className="text-lg text-rose-600">
            {isOpened
              ? "Hope you love it as much as I love you!"
              : "Click the gift box to reveal your special surprise!"}
          </p>
        </motion.div>

        <div className="flex justify-center items-center min-h-[400px]">
          <AnimatePresence>
            {!isOpened ? (
              <motion.div
                key="gift-box"
                className="cursor-pointer"
                onClick={handleGiftClick}
                animate={
                  isShaking
                    ? {
                        x: [-10, 10, -10, 10, -10, 10, 0],
                        y: [-5, 5, -5, 5, -5, 5, 0],
                        rotate: [-2, 2, -2, 2, -2, 2, 0],
                      }
                    : {}
                }
                transition={{ duration: 0.5, repeat: isShaking ? Infinity : 0 }}
                whileHover={{ scale: 1.05, rotateY: 10 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Gift box */}
                <div className="relative">
                  {/* Box body */}
                  <div className="w-48 h-48 bg-gradient-to-br from-red-400 to-red-600 rounded-2xl shadow-2xl relative overflow-hidden">
                    {/* Gift pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-0 left-0 w-full h-full">
                        <div className="w-full h-full bg-gradient-to-r from-transparent via-white to-transparent transform rotate-45" />
                      </div>
                    </div>

                    {/* Ribbon vertical */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-full bg-gradient-to-b from-yellow-300 to-yellow-500" />

                    {/* Ribbon horizontal */}
                    <div className="absolute top-1/2 transform -translate-y-1/2 w-full h-8 bg-gradient-to-r from-yellow-300 to-yellow-500" />

                    {/* Gift icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Gift className="w-16 h-16 text-white opacity-80" />
                    </div>
                  </div>

                  {/* Bow */}
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                      <div className="w-8 h-8 border-4 border-yellow-200 rounded-full" />
                    </div>
                  </div>

                  {/* Sparkles around the box */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-3 h-3 bg-yellow-300 rounded-full"
                      style={{
                        top: `${20 + Math.random() * 60}%`,
                        left: `${-20 + Math.random() * 140}%`,
                      }}
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                        rotate: [0, 180, 360],
                      }}
                      transition={{
                        duration: 2,
                        delay: Math.random() * 2,
                        repeat: Infinity,
                        repeatDelay: 1,
                      }}
                    />
                  ))}
                </div>

                {/* Instructions */}
                <motion.div
                  className="mt-8 text-center"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <p className="text-rose-700 font-semibold">
                    Click me to open! ✨
                  </p>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="gift-revealed"
                initial={{ scale: 0, rotateY: 180 }}
                animate={{ scale: 1, rotateY: 0 }}
                transition={{ duration: 1, type: "spring" }}
                className="text-center max-w-2xl"
              >
                {/* Revealed gift content */}
                <div className="bg-white rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                  {/* Background decoration */}
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-rose-50" />

                  {/* Floating hearts */}
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        y: [-20, -40, -20],
                        opacity: [0.3, 0.8, 0.3],
                        scale: [0.8, 1.2, 0.8],
                      }}
                      transition={{
                        duration: 3,
                        delay: Math.random() * 2,
                        repeat: Infinity,
                      }}
                    >
                      <Heart className="w-4 h-4 text-pink-300" />
                    </motion.div>
                  ))}

                  <div className="relative z-10">
                    <Sparkles className="w-12 h-12 text-yellow-500 mx-auto mb-4" />

                    <h3
                      className="text-3xl font-bold text-gray-800 mb-6"
                      style={{ fontFamily: "Dancing Script, cursive" }}
                    >
                      Your Special Gift! 💝
                    </h3>

                    {/* Gift image placeholder */}
                    <div className="mb-6">
                      <img
                        src="https://images.pexels.com/photos/264946/pexels-photo-264946.jpeg"
                        alt="Special gift"
                        className="w-full max-w-sm mx-auto rounded-2xl shadow-lg"
                      />
                    </div>

                    <div className="space-y-4 text-gray-700">
                      <p className="text-lg font-semibold">
                        Neeku em kavali ante… adhi teesuko!
                      </p>
                      <p className="leading-relaxed">
                        Did I ever stop you from buying something you wanted?
                        Never. And I never will. You deserve every single thing
                        that makes you happy. That’s why I got you this gorgeous
                        jewelry organizer — I know you keep losing your
                        earrings. It even plays our favorite childhood lullaby
                        when you open it. 🥰
                      </p>
                      <p className="text-sm text-gray-600">
                        If you ever want anything, I should be the first person
                        you ask. After all, I’m your lil brother — here for you
                        anytime, anywhere. ❤️
                      </p>
                    </div>

                    {/* Optional: Link to actual gift/purchase */}
                    {/* <motion.div
                      className="mt-6"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <button className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center space-x-2">
                        <span>Track Your Gift</span>
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </motion.div> */}
                  </div>
                </div>

                {/* Final message */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                  className="mt-8 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-2xl p-6 shadow-xl"
                >
                  <h4
                    className="text-2xl font-bold mb-2"
                    style={{ fontFamily: "Dancing Script, cursive" }}
                  >
                    Happy Raksha Bandhan! 🎉
                  </h4>
                  <p className="text-lg leading-relaxed">
                    Thank you for being the most amazing sister anyone could ask
                    for. This digital storybook is just a small way to show how
                    much you mean to me. Here's to many more years of laughter,
                    adventures, and unconditional love! 💕💕💕
                    Your Lovely Lil
                    Dafodill... 🥰🥰
                    
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default GiftReveal;
