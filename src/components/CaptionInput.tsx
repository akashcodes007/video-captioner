"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CaptionInput({ captions, setCaptions }: { captions: any[], setCaptions: any }) {
  const [currentTime, setCurrentTime] = useState(0);

  const addCaption = () => {
    setCaptions([...captions, { text: '', start: '', end: '' }]);
  };

  const updateCaption = (index: number, field: string, value: string) => {
    const updated = [...captions];
    updated[index][field] = value;
    setCaptions(updated);
  };

  const removeCaption = (index: number) => {
    const updated = captions.filter((_, i) => i !== index);
    setCaptions(updated);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // This is a placeholder for updating the current time
      // In a real application, you would get this from the video player
      setCurrentTime(prevTime => prevTime + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className="w-full max-w-lg bg-white shadow-md rounded-lg p-4 mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2 
        className="text-lg font-semibold text-gray-700 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Add Captions
      </motion.h2>
      {captions.map((caption, index) => (
        <motion.div 
          key={index} 
          className="flex items-center space-x-4 mb-2"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <input
            type="text"
            placeholder="Caption text"
            value={caption.text}
            onChange={(e) => updateCaption(index, 'text', e.target.value)}
            className="w-1/2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out transform hover:scale-105 text-black"
          />
          <input
            type="text"
            placeholder="Start (in seconds)"
            value={caption.start}
            onChange={(e) => updateCaption(index, 'start', e.target.value)}
            className="w-1/4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out transform hover:scale-105 text-black"
          />
          <input
            type="text"
            placeholder="End (in seconds)"
            value={caption.end}
            onChange={(e) => updateCaption(index, 'end', e.target.value)}
            className="w-1/4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out transform hover:scale-105 text-black"
          />
          <motion.button
            onClick={() => removeCaption(index)}
            className="bg-red-500 text-white py-1 px-2 rounded-lg shadow hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Remove
          </motion.button>
        </motion.div>
      ))}
      <motion.div className="flex justify-center mt-4">
        <motion.button
          onClick={addCaption}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Add Caption
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
