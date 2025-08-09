import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Star, Gift, Music, Camera, MessageCircle } from 'lucide-react';
import OpeningAnimation from './components/OpeningAnimation';
import MemoryTimeline from './components/MemoryTimeline';
import ReasonsSection from './components/ReasonsSection';
import InteractiveRakhi from './components/InteractiveRakhi';
import PersonalizedLetter from './components/PersonalizedLetter';
import VideoMontage from './components/VideoMontage';
import SisterQuiz from './components/SisterQuiz';
import GiftReveal from './components/GiftReveal';
import Confetti from './components/Confetti';

function App() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [showOpening, setShowOpening] = useState(true);

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const sections = [
    { id: 'opening', component: <OpeningAnimation onComplete={() => setShowOpening(false)} /> },
    { id: 'memories', component: <MemoryTimeline /> },
    { id: 'reasons', component: <ReasonsSection /> },
    { id: 'rakhi', component: <InteractiveRakhi onComplete={triggerConfetti} /> },
    { id: 'letter', component: <PersonalizedLetter /> },
    { id: 'video', component: <VideoMontage /> },
    { id: 'quiz', component: <SisterQuiz /> },
    { id: 'gift', component: <GiftReveal /> }
  ];

  if (showOpening) {
    return (
      <div className="min-h-screen">
        <OpeningAnimation onComplete={() => setShowOpening(false)} />
        {showConfetti && <Confetti />}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-yellow-50">
      {showConfetti && <Confetti />}
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <MemoryTimeline />
        <ReasonsSection />
        <InteractiveRakhi onComplete={triggerConfetti} />
        <PersonalizedLetter />
        <VideoMontage />
        <SisterQuiz />
        <GiftReveal />
      </div>
    </div>
  );
}

export default App;