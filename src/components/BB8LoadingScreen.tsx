'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/*
 * MOBILE SIZE CONFIGURATION:
 * To adjust the BB-8 robot size on mobile devices, modify the MOBILE_CONFIG object below:
 * - width: Controls how wide the robot appears (try '300%', '350%', '400%' for larger)
 * - height: Controls how tall the robot appears (try '900px', '1000px', '1200px' for larger)
 * 
 * Example for much larger mobile robot:
 * const MOBILE_CONFIG = {
 *   width: '350%',    // Much wider
 *   height: '1000px', // Much taller
 * };
 */

interface BB8LoadingScreenProps {
  onComplete?: () => void;
}

const BB8LoadingScreen = ({ onComplete }: BB8LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showFadeTransition, setShowFadeTransition] = useState(false);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  
  const MOBILE_CONFIG = {
    width: '100%',    
    height: '900px',  
    viewBox: isMobile ? '300 0 600 250' : '0 0 1200 250',
  };

  useEffect(() => {
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 300);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsComplete(true);
          
          setTimeout(() => {
            setShowFadeTransition(true);
          }, 1000);
          
          setTimeout(() => {
            onComplete?.();
          }, 3000);
          
          return 100;
        }
        
        return prev + Math.random() * 3 + 1;
      });
    }, 100);

    return () => {
      clearTimeout(contentTimer);
      clearInterval(interval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden">
      <AnimatePresence>
        {showContent && (
          <motion.div
            className="w-full h-full flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
             {/* BB-8 Animation - Centered and Larger */}
             <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
               <svg 
                 viewBox={MOBILE_CONFIG.viewBox}
                 width="120%" 
                 height="400" 
                 preserveAspectRatio="xMidYMid meet" 
                 className="max-w-none" 
                 style={{
                   clipPath: 'inset(0 0 0 0)',
                   width: isMobile ? MOBILE_CONFIG.width : '120%',
                   height: isMobile ? MOBILE_CONFIG.height : '400px'
                 }}
               >
                 {/* Apply horizontal flip transformation to entire SVG content */}
                 <g transform="scale(-1, 1) translate(-1200, 0)">
                   <defs>
                     {/* clip to crop the circle and ellipse elements in the body of the droid */}
                     <clipPath id="body">
                       <circle cx="0" cy="0" r="33.75"></circle>
                     </clipPath>
                     {/* clip to crop the circle fabricating the reflection */}
                     <clipPath id="len">
                       <circle cx="0" cy="16.5" r="6.75"></circle>
                     </clipPath>
                     {/* linear gradient used for the reflection on the lens of the droid */}
                     <linearGradient id="lens" x1="0" x2="0.25" y1="0" y2="0.25" spreadMethod="repeat">
                       <stop offset="0" stopColor="transparent"></stop>
                       <stop offset="0.5" stopColor="transparent"></stop>
                       <stop offset="0" stopColor="#fff"></stop>
                       <stop offset="1" stopColor="#fff"></stop>
                     </linearGradient>
                     {/* dashes replicated to the side of the droid */}
                     <path id="dash" strokeDasharray="20 4 2" d="M 0 0 h 26"></path>
                     <path id="dash--small" d="M 0 0 h 8"></path>
                     {/* particle replicated to the side of the droid */}
                     <path id="particle" d="M 0 -2 a 5 5 0 0 0 0 4 a 5 5 0 0 0 0 -4 m -2 2 a 5 5 0 0 0 4 0 a 5 5 0 0 0 -4 0"></path>
                   </defs>
                   
                   {/* Extended ground spanning full width */}
                   <g fill="none" stroke="#FF6B35" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" transform="translate(0 152.5)">
                     <g id="ground" className="ground">
                       {/* Extended ground pattern to cover full width */}
                       <path strokeDasharray="40 6 6 6 120 6 40 6 6 60 6 6 6 80 6 40 6 6" d="M 1.25 0 h 40 a 3 3 0 0 1 6 0 h 200 a 3 3 0 0 1 6 0 h 100 a 3 3 0 0 1 6 0 h 240 a 3 3 0 0 1 6 0 h 150 a 3 3 0 0 1 6 0 h 180 a 3 3 0 0 1 6 0 h 100 a 3 3 0 0 1 6 0 h 150"></path>
                       <g transform="translate(0 20)">
                         <path strokeDasharray="30 15 50 30 15 80 40 15 50" d="M 60 0 h 8 a 3 3 0 0 1 6 0 h 50 a 3 3 0 0 1 6 0 h 10 h 80 a 3 3 0 0 1 6 0 h 120 a 3 3 0 0 1 6 0 h 200 a 3 3 0 0 1 6 0 h 150 a 3 3 0 0 1 6 0 h 100 a 3 3 0 0 1 6 0 h 180 a 3 3 0 0 1 6 0 h 140"></path>
                         <g transform="translate(0 20)">
                           <path d="M 85 0 h 15 a 3 3 0 0 1 6 0 h 7 h 40 a 3 3 0 0 1 6 0 h 100 a 3 3 0 0 1 6 0 h 60 a 3 3 0 0 1 6 0 h 200 a 3 3 0 0 1 6 0 h 150 a 3 3 0 0 1 6 0 h 180 a 3 3 0 0 1 6 0 h 250"></path>
                         </g>
                       </g>
                     </g>
                     {/* Duplicate ground for seamless animation */}
                     <use href="#ground" transform="translate(-1200 0)"></use>
                   </g>
                   
                   {/* Particles - Clean and minimal */}
                   <g fill="none" stroke="#FF6B35" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                     <g transform="translate(86 56)">
                       <use href="#dash" className="dash" style={{animationDelay: '-0.75s'}}></use>
                       <g transform="translate(10 15)">
                         <use href="#dash" className="dash" style={{animationDelay: '-0.6s'}}></use>
                       </g>
                       <g fill="#FF8C42" stroke="#FF8C42">
                         <g transform="translate(10 7.5)">
                           <use style={{animationDelay: '-0.8s'}} href="#particle" className="particle" transform="scale(0.9)"></use>
                         </g>
                         <g transform="translate(80 50)">
                           <use style={{animationDelay: '-0.5s'}} href="#particle" className="particle" transform="scale(1.2)"></use>
                         </g>
                         <g transform="translate(95 40)">
                           <use style={{animationDelay: '-0.4s'}} href="#particle" className="particle" transform="scale(0.6)"></use>
                         </g>
                       </g>
                       <g fill="#FFA500" stroke="#FFA500">
                         <g transform="translate(60 18)">
                           <use style={{animationDelay: '-0.62s'}} href="#particle" className="particle" transform="scale(1.1)"></use>
                         </g>
                         <g transform="translate(40 40)">
                           <use style={{animationDelay: '-0.75s'}} href="#particle" className="particle" transform="scale(1)"></use>
                         </g>
                       </g>
                     </g>
                   </g>
                   
                   {/* BB-8 droid body positioned in center */}
                   <g fill="#000000" stroke="#FF6B35" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" transform="translate(1.25 1.25)">
                     <g transform="translate(600 50)">
                       <g transform="translate(0 65)">
                         <g className="bb8-base" transform="translate(0 0) rotate(-40)">
                           <g transform="translate(0 -65)">
                             {/* body */}
                             <g transform="translate(0 65)">
                               <g className="bb8-center">
                                 <circle cx="0" cy="0" r="35"></circle>
                                 <g clipPath="url(#body)">
                                   <path fill="none" d="M -15 -25 L 35 0 L -5 28 z"></path>
                                   <circle fill="#FF8C42" cx="-15" cy="-25" r="22"></circle>
                                   <circle cx="-15" cy="-25" r="9"></circle>
                                   <ellipse fill="#FF8C42" cx="35" cy="0" ry="30" rx="10"></ellipse>
                                   <ellipse fill="#FF8C42" cx="-5" cy="28" rx="20" ry="18"></ellipse>
                                   <ellipse cx="-5" cy="28" rx="8" ry="7.2"></ellipse>
                                   <circle fill="#FF6B35" stroke="none" cx="7" cy="1" r="2"></circle>
                                   <circle fill="#FF6B35" stroke="none" cx="-22" cy="4.5" r="2"></circle>
                                   <g stroke="none" fill="#FF6B35" opacity="0.2">
                                     <path d="M -45 0 a 45 45 0 0 1 90 0 a 55 55 0 0 0 -90 0"></path>
                                     <path transform="rotate(-15)" d="M -35 0 a 35 35 0 0 0 70 0 a 37 37 0 0 1 -70 0"></path>
                                   </g>
                                 </g>
                               </g>
                             </g>
                             {/* head */}
                             <g>
                               <path d="M -29 29 l 6 8 h 46 l 6 -8 a 29 29 0 0 0 -58 0"></path>
                               <g stroke="none">
                                 <path opacity="0.85" fill="#000" d="M 0 1.25 a 27.75 27.75 0 0 0 -27.75 27.25 h 5 a 27.5 27.5 0 0 1 22.75 -27.25"></path>
                                 <path opacity="0.15" fill="#FF6B35" d="M 0 1.25 a 27.75 27.75 0 0 1 27.75 27.25 h -5 a 27.5 27.5 0 0 0 -22.75 -27.25"></path>
                                 <path opacity="0.25" fill="#FF6B35" d="M -27.75 28.5 l 6 8 h 43.5 l 6 -8 h -15.25 q -5 0 -5 -10 h -15 q 0 10 -5 10"></path>
                               </g>
                               <circle cx="0" cy="16.5" r="8" fill="#E85D04"></circle>
                               <g clipPath="url(#len)">
                                 <g className="reflection">
                                   <circle cx="0" cy="16.5" r="8" fill="url(#lens)" opacity="0.1"></circle>
                                 </g>
                               </g>
                               <circle cx="17" cy="24" r="3" stroke="none" fill="#FF6B35"></circle>
                             </g>
                           </g>
                         </g>
                       </g>
                     </g>
                   </g>
                   
                   {/* Dashes above bb-8 */}
                   <g fill="none" stroke="#FF6B35" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" transform="translate(602 77)">
                     <g>
                       <use className="dash" href="#dash--small" style={{animationDelay: '-0.56s'}}></use>
                       <g transform="translate(28 47)">
                         <use className="dash" href="#dash--small" style={{animationDelay: '-0.4s'}}></use>
                         <g transform="translate(5 5)">
                           <use className="dash" href="#dash--small" style={{animationDelay: '-0.34s'}}></use>
                           <g transform="translate(13 0)">
                             <use className="dash" strokeDasharray="3 5" href="#dash--small" style={{animationDelay: '-0.3s'}}></use>
                           </g>
                         </g>
                       </g>
                     </g>
                   </g>
                 </g>
               </svg>
             </div>

             {/* Score Display - Right Corner */}
             <motion.div
               className="absolute top-8 right-8"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0, duration: 0.5 }}
             >
               <motion.div
                 className="text-right"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 0, duration: 0.3 }}
               >
                 <p className="text-xs md:text-sm font-bold text-orange-400 mb-1 retro-font">
                   HighScore 100
                 </p>
                 <p className="text-xs md:text-sm font-bold text-orange-400 retro-font">
                   Score {Math.round(progress)}
                 </p>
               </motion.div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Immersive Fade Transition */}
      <AnimatePresence>
        {showFadeTransition && (
          <motion.div
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          >
          </motion.div>
        )}
      </AnimatePresence>

       {/* CSS Animations */}
       <style jsx>{`
         @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');
         
         /* Retro game font fallback */
         .retro-font {
           font-family: 'Orbitron', 'Courier New', monospace;
           font-weight: 700;
           letter-spacing: 1px;
           text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
         }
         /* animate bb-8 to rotate and translate horizontally */
         .bb8-base {
           animation: dash 0.8s infinite alternate cubic-bezier(0.645, 0.045, 0.55, 1);
         }
         @keyframes dash {
           to {
             transform: translate(50px) rotate(-20deg);
           }
         }

         /* animate the body of bb-8 to rotate */
         .bb8-center {
           animation: rotate 0.8s infinite linear;
         }
         @keyframes rotate {
           to {
             transform: rotate(-360deg);
           }
         }

         /* Ground translation */
         .ground {
           animation: translateGround 1.6s infinite linear;
         }
         @keyframes translateGround {
           0% { transform: translateX(0); }
           100% { transform: translateX(1200px); }
         }

         /* Dashes and particles animation */
         .dash, .particle {
           animation: translateDashesParticles 1.6s infinite linear;
         }
         @keyframes translateDashesParticles {
           0% { transform: translateX(-50px); }
           100% { transform: translateX(1250px); }
         }

         /* Reflection on BB-8 lens */
         .reflection {
           animation: translateReflection 0.8s infinite linear;
         }
         @keyframes translateReflection {
           0%, 25% {
             transform: translateX(-20px);
           }
           75%, 100% {
             transform: translateX(20px);
           }
         }
       `}</style>
    </div>
  );
};

export default BB8LoadingScreen;
