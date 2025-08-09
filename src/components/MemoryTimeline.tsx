import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Camera, Heart } from 'lucide-react';
import pic_2018 from "/images/2018.jpg";
import pic_2022 from "/images/2022.jpg";
import pic_2024 from "/images/2024.jpg";
import pic_2019 from "/images/2019.jpg";
import pic_2025 from "/images/2025.jpg";
import pic_2006 from "/images/2006.jpg";
import pic_2012 from "/images/2012.jpg";

const MemoryTimeline: React.FC = () => {
  const memories = [
  {
    year: '2006',
    image: pic_2006,
    caption: 'Our very first photo I ever had on my mobile... 📱',
    description: 'We looked so cute back then. I still remember how much you cared for me… I was your little brother, and you treated me like your world. 🥰'
  },
  {
    year: '2012',
    image: pic_2012,
    caption: 'The Krishna avatar of me… and I know one of the people decorating me was you ❤️',
    description: 'Only now I realize — you’ve been decorating and caring for me since my childhood. 🤔'
  },
  {
    year: '2018',
    image: pic_2018,
    caption: 'Our first Rakhi picture I ever had...',
    description: 'We were so happy back then, living in that small house, the four of us together… those were truly golden days.'
  },
  {
    year: '2019',
    image: pic_2019,
    caption: 'The most interesting part for you…',
    description: 'After tying Rakhi, the next big moment for you was giving me blessings — and for me, it was the funniest and most special part… you know why 😅'
  },
  {
    year: '2022',
    image: pic_2022,
    caption: 'The year we celebrated Rakhi before the actual day…',
    description: 'Since both of us were busy studying and couldn’t meet on the actual day, we celebrated early. It felt different… but I was still happy to have that moment with you. 😒'
  },
  {
    year: '2023',
    image: pic_2024,
    caption: 'I missed you so much that I kept the Rakhi tied for an entire year… 😍',
    description: 'It made me feel like you were right there with me every day. And yes… I still enjoyed taking your blessings — for the same reason as always 😅'
  },
  {
    year: '2025',
    image: pic_2025,
    caption: 'Present day — I’m in Vadodara, you’re in Bhupalpally…',
    description: 'I truly hope this is the last year we’re celebrating Rakhi apart. From next year, I wish we’ll be together again… Miss you so much, Akkagarandi. 🥰🥰'
  }


  ];

  return (
    <section className="py-16 bg-gradient-to-r from-pink-100 to-rose-100 rounded-3xl mb-12">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 
            className="text-4xl md:text-5xl font-bold text-pink-800 mb-4"
            style={{ fontFamily: 'Dancing Script, cursive' }}
          >
            Our Memory Lane
          </h2>
          <p className="text-lg text-pink-600">A journey through our best moments together</p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-pink-300 hidden md:block" />
          
          {memories.map((memory, index) => (
            <motion.div
              key={memory.year}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`flex items-center mb-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Content */}
              <div className="w-full md:w-5/12 mb-6 md:mb-0">
                <motion.div
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  className="bg-white rounded-2xl shadow-xl p-6 transform transition-all duration-300"
                >
                  <div className="flex items-center mb-4">
                    <Calendar className="w-5 h-5 text-pink-500 mr-2" />
                    <span className="font-bold text-pink-700 text-lg">{memory.year}</span>
                  </div>
                  
                  <img
                    src={memory.image}
                    alt={`Memory from ${memory.year}`}
                    className="w-full object-cover rounded-xl mb-4"
                  />
                  
                  <p 
                    className="text-lg font-semibold text-gray-800 mb-2"
                    style={{ fontFamily: 'Pacifico, cursive' }}
                  >
                    {memory.caption}
                  </p>
                  
                  <p className="text-gray-600">{memory.description}</p>
                </motion.div>
              </div>

              {/* Timeline dot */}
              <div className="hidden md:flex w-2/12 justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                  className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center shadow-lg"
                >
                  <Heart className="w-6 h-6 text-white fill-current" />
                </motion.div>
              </div>

              {/* Spacer for alternating layout */}
              <div className="hidden md:block w-5/12" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MemoryTimeline;