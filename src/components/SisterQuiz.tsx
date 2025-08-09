import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Trophy, Star } from 'lucide-react';

const SisterQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const questions = [
    {
      question: "What was the first thing you ever cooked for me?",
      options: [
        "Dosa",
        "Maggi",
        "Pappu",
        "Ippatiki emi cheyyaledu 😅"
      ],
      correct: 1,
      explanation: "Gurtunda? Nuvvu first time dosa chesindi mana pataa intlo… appude naku thelisinavi nee cooking skills start aiyayi. 🥰"
    },
    {
      question: "What’s the one thing we ate together from outside the most till my 10th?",
      options: [
        "Punugulu",
        "Chicken Biryani",
        "Ice cream (any flavor)",
        "I don’t know"
      ],
      correct: 2,
      explanation: "Gurtunda? Manam, nenu, nuvvu, amma, nana andharam kalisi butterscotch ice cream tinedam… oorike ala ala velipoye rojullo. 🍦"
    },
    {
      question: "Which was the first movie we watched together in a theater?",
      options: [
        "Bommarillu",
        "Magadheera",
        "Robo",
        "Eega"
      ],
      correct: 1,
      explanation: "Naku kuda full sure ledu… kani gurtundi mana first theater movie Magadheera ani. 🎬"
    },
    {
      question: "What’s the best gift you’ve ever given me?",
      options: [
        "That handmade birthday card with all the inside jokes",
        "Your time and endless patience",
        "Your shoulder to climb every step in my life",
        "All of the above — you’re the gift that keeps on giving!"
      ],
      correct: 3,
      explanation: "The best gifts can’t be wrapped! Your love, support, and presence in my life are more precious than anything. 💝"
    },
    {
      question: "If I could describe our relationship in one word, it would be:",
      options: [
        "Chaotic (but in the best way)",
        "Unbreakable",
        "Magical",
        "All of these perfectly describe us!"
      ],
      correct: 3,
      explanation: "We’re chaotically unbreakable magic! Our bond is unique, special, and absolutely perfect just the way it is. ✨"
    }
  ];


  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    setShowResult(true);
    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      setShowResult(false);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setQuizComplete(true);
      }
    }, 3000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizComplete(false);
  };

  if (quizComplete) {
    return (
      <section className="py-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-3xl mb-12">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto"
          >
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
            
            <h2 
              className="text-4xl md:text-5xl font-bold text-emerald-800 mb-4"
              style={{ fontFamily: 'Dancing Script, cursive' }}
            >
              Quiz Complete! 🎉
            </h2>
            
            <div className="bg-white rounded-2xl p-8 shadow-xl mb-6">
              <p className="text-2xl font-bold text-gray-800 mb-4">
                You scored {score} out of {questions.length}!
              </p>
              
              <p className="text-lg text-gray-600 leading-relaxed" style={{ fontFamily: 'Pacifico, cursive' }}>
                {score === questions.length ? 
                  "Perfect score! You know me better than I know myself! You truly are the best sister in the universe! 🌟" :
                  score >= questions.length / 2 ?
                  "Amazing! You know me so well! Our bond is truly special, and I'm so grateful to have you as my sister! 💕" :
                  "You're still learning about me, and that's what makes our relationship so beautiful - we keep discovering new things about each other! 🥰"
                }
              </p>
            </div>
            
            <motion.button
              onClick={resetQuiz}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Take Quiz Again
            </motion.button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-3xl mb-12">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h2 
            className="text-4xl md:text-5xl font-bold text-blue-800 mb-4"
            style={{ fontFamily: 'Dancing Script, cursive' }}
          >
            Do You Remember? 🤔
          </h2>
          <p className="text-lg text-blue-600">
            Let's see how well you know me! Question {currentQuestion + 1} of {questions.length}
          </p>
          
          {/* Progress bar */}
          <div className="w-full max-w-md mx-auto mt-4 h-2 bg-white rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-400 to-cyan-400"
              initial={{ width: '0%' }}
              animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="bg-white rounded-2xl p-8 shadow-xl"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                {questions[currentQuestion].question}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {questions[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showResult}
                    whileHover={!showResult ? { scale: 1.02 } : {}}
                    whileTap={!showResult ? { scale: 0.98 } : {}}
                    className={`p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                      selectedAnswer === index
                        ? showResult
                          ? index === questions[currentQuestion].correct
                            ? 'border-green-400 bg-green-50 text-green-800'
                            : 'border-red-400 bg-red-50 text-red-800'
                          : 'border-blue-400 bg-blue-50 text-blue-800'
                        : showResult && index === questions[currentQuestion].correct
                        ? 'border-green-400 bg-green-50 text-green-800'
                        : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{option}</span>
                      {showResult && (
                        <div>
                          {index === questions[currentQuestion].correct && (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          )}
                          {selectedAnswer === index && index !== questions[currentQuestion].correct && (
                            <XCircle className="w-5 h-5 text-red-500" />
                          )}
                        </div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>

              <AnimatePresence>
                {showResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 mb-6"
                  >
                    <div className="flex items-center mb-3">
                      <Star className="w-5 h-5 text-purple-500 mr-2" />
                      <span className="font-semibold text-purple-800">Did you know?</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {questions[currentQuestion].explanation}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {!showResult && (
                <div className="text-center">
                  <button
                    onClick={handleNext}
                    disabled={selectedAnswer === null}
                    className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                      selectedAnswer !== null
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg hover:shadow-xl hover:scale-105'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default SisterQuiz;