"use client";
import React, { useState } from "react";
import CaptionInput from '../components/CaptionInput';
import VideoPlayer from '../components/VideoPlayer';
import { motion } from 'framer-motion';
import validateURL from '../utils/validateURL';
import { useSnackbar } from 'notistack';

interface Caption {
  text: string;
  start: string;
  end: string;
}

export default function Home() {
  const { enqueueSnackbar } = useSnackbar();
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [captions, setCaptions] = useState<Caption[]>([]);
  const [inputUrl, setInputUrl] = useState<string>('');
  const [videoError, setVideoError] = useState<boolean>(false);

  const handleUrlSubmit = () => {
    if (validateURL(inputUrl)) {
      setVideoUrl(inputUrl);
      setVideoError(false);
    } else {
      enqueueSnackbar('Invalid URL. Please enter a valid video URL.', { variant: 'error' });
      setVideoUrl('');
      setVideoError(true);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleUrlSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-gray-100 flex flex-col items-center p-4">
      <motion.h1 
        className="text-3xl font-extrabold text-gray-800 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Video Captioner
      </motion.h1>
      <motion.div 
        className="w-full max-w-lg mb-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <input
          type="text"
          placeholder="Enter Video URL"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-105 text-black"
        />
        <div className="flex justify-center">
          <button
            onClick={handleUrlSubmit}
            className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Submit
          </button>
        </div>
      </motion.div>
      {videoError && (
        <motion.div
          className="text-red-500 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          The url entered is not valid. Please check the URL and try again.
        </motion.div>
      )}
      {videoUrl && !videoError && (
        <div className="flex flex-col lg:flex-row lg:space-x-4 w-full max-w-5xl">
          <motion.div
            className="flex-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CaptionInput captions={captions} setCaptions={setCaptions} />
          </motion.div>
          <motion.div
            className="flex-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <VideoPlayer videoUrl={videoUrl} captions={captions} />
          </motion.div>
        </div>
      )}
      <div className="absolute bottom-4 right-4 text-sm text-gray-600">
        Made with ❤️ for Spyne by Akashdeep Singh <br /> Email: akashdeep.sde@gmail.com
      </div>
    </div>
  );
}
