'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HomePage from '@/components/HomePage';
import Navigation from '@/components/Navigation';
import BB8LoadingScreen from '@/components/BB8LoadingScreen';

const globalStyles = `
  body {
    overflow-x: hidden;
    scrollbar-width: none;
  }
  body::-webkit-scrollbar {
    display: none;
  }
  .ms-overflow-style: none;
`;

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasSeenIntro, setHasSeenIntro] = useState(false);

  useEffect(() => {
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const isRefresh = navigationEntry?.type === 'reload';
    
    if (isRefresh) {
    } else {
      const seenIntro = sessionStorage.getItem('robotics-intro-seen');
      if (seenIntro === 'true') {
        setHasSeenIntro(true);
        setIsLoading(false);
      }
    }
  }, []);

  const handleLoadingComplete = () => {
    sessionStorage.setItem('robotics-intro-seen', 'true');
    setIsLoading(false);
  };

  if (isLoading && !hasSeenIntro) {
    return <BB8LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <>
      <style>{globalStyles}</style>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="pt-20"
      >
        <HomePage />
      </motion.div>
    </>
  );
}
