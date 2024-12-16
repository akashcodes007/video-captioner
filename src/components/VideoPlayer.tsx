"use client";

import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import { motion } from 'framer-motion';

export default function VideoPlayer({ videoUrl, captions }: { videoUrl: string, captions: any[] }) {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const playerRef = useRef<ReactPlayer>(null);

  const handleProgress = (state: { playedSeconds: number }) => {
    setCurrentTime(state.playedSeconds);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.div 
      className="w-full max-w-5xl bg-white shadow-md rounded-lg p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ReactPlayer
        ref={playerRef}
        url={videoUrl}
        playing={isPlaying}
        controls
        width="100%"
        height="auto"
        className="rounded-lg overflow-hidden"
        onProgress={handleProgress}
        style={{ minWidth: '200px' }}
      />
      <motion.div className="flex justify-center mt-4">
        <motion.button
          onClick={togglePlayPause}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </motion.button>
      </motion.div>
      <div className="relative mt-4">
        {captions.map((caption, index) => (
          currentTime >= parseFloat(caption.start) && currentTime <= parseFloat(caption.end) && (
            <motion.p
              key={index}
              className="absolute bg-black text-white text-sm p-1 rounded opacity-75"
              style={{
                top: `${index * 30}px`, // Adjust position dynamically
                left: '50%',
                transform: 'translateX(-50%)',
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {caption.text}
            </motion.p>
          )
        ))}
      </div>
    </motion.div>
  );
}
