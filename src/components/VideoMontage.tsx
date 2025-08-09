import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2 } from 'lucide-react';
import vedio from "/vedios/memories.mp4";

const VideoMontage: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      setProgress((video.currentTime / video.duration) * 100);
    };

    video.addEventListener('timeupdate', updateProgress);
    return () => video.removeEventListener('timeupdate', updateProgress);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl mb-12">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h2 
            className="text-4xl md:text-5xl font-bold text-indigo-800 mb-4"
            style={{ fontFamily: 'Dancing Script, cursive' }}
          >
            Our Movie Collection
          </h2>
          <p className="text-lg text-indigo-600">
            A cinematic journey through our beautiful moments
          </p>
        </motion.div>

        {/* Cinema-style frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Outer cinema frame */}
          <div className="bg-gradient-to-r from-gray-800 to-black rounded-3xl p-6 shadow-2xl">
            {/* Inner frame */}
            <div className="bg-black rounded-2xl overflow-hidden relative">
              
              {/* Real video */}
              <div className="relative aspect-video bg-black">
                <video
                  ref={videoRef}
                  src= {vedio} // <-- Replace with your actual video file path
                  className="w-full h-full object-cover"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  controls={false} // Custom controls
                />

                {/* Play button overlay */}
                <AnimatePresence>
                  {!isPlaying && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <motion.button
                        onClick={togglePlay}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-20 h-20 bg-white bg-opacity-90 rounded-full flex items-center justify-center shadow-2xl group"
                      >
                        <Play className="w-8 h-8 text-gray-800 ml-1 group-hover:text-indigo-600 transition-colors" />
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Controls overlay */}
                {isPlaying && (
                  <div
                    className="absolute inset-0 flex flex-col justify-end pb-4"
                    onMouseEnter={() => setShowControls(true)}
                    onMouseLeave={() => setShowControls(false)}
                  >
                    {showControls && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="flex items-center space-x-4 bg-black bg-opacity-50 rounded-full px-6 py-3 mx-auto"
                      >
                        <button
                          onClick={togglePlay}
                          className="text-white hover:text-pink-300 transition-colors"
                        >
                          <Pause className="w-6 h-6" />
                        </button>

                        {/* Progress bar */}
                        <div className="w-32 h-1 bg-gray-600 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-pink-400"
                            style={{ width: `${progress}%` }}
                          />
                        </div>

                        <Volume2 className="w-5 h-5 text-white" />
                      </motion.div>
                    )}
                  </div>
                )}
              </div>

              {/* Cinema decorations */}
              <div className="absolute -left-4 top-0 bottom-0 w-8 bg-gradient-to-r from-yellow-400 to-amber-500 opacity-80">
                <div className="h-full flex flex-col justify-evenly">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="w-full h-3 bg-black opacity-30" />
                  ))}
                </div>
              </div>
              
              <div className="absolute -right-4 top-0 bottom-0 w-8 bg-gradient-to-l from-yellow-400 to-amber-500 opacity-80">
                <div className="h-full flex flex-col justify-evenly">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="w-full h-3 bg-black opacity-30" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Theater lights */}
          <div className="absolute -top-2 left-8 w-4 h-4 bg-red-400 rounded-full shadow-lg" />
          <div className="absolute -top-2 right-8 w-4 h-4 bg-green-400 rounded-full shadow-lg" />
        </motion.div>

        {/* Video description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-8"
        >
          <div className="bg-white bg-opacity-80 rounded-2xl p-6 max-w-2xl mx-auto">
            <p className="text-gray-700 text-lg leading-relaxed" style={{ fontFamily: 'Pacifico, cursive' }}>
              A collection of all our silly moments, adventures, and precious memories. 
              From childhood giggles to recent adventures - this is our story! 🎬✨
            </p>
            <p className="text-gray-600 mt-4 text-sm">
              Now playing your actual video montage — relive the moments! 💕
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoMontage;
