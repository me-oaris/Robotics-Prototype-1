'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import ParticleLinks from './ParticleLinks';

interface EventProps {
  title: string;
  date: string;
  description: string;
  image?: string;
}

const Event = ({ title, date, description, image }: EventProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  
  return (
    <motion.div
      ref={ref}
      className="flex flex-col md:flex-row gap-6 items-center bg-white/5 backdrop-blur-sm rounded-xl p-6 overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      {image && (
        <div className="w-full md:w-1/3 h-48 md:h-auto relative rounded-lg overflow-hidden">
          <Image 
            src={image} 
            alt={title} 
            fill 
            className="object-cover"
            style={image?.includes('logo.svg') ? { filter: 'hue-rotate(-10deg) saturate(1.5) brightness(1.0)' } : {}}
          />
        </div>
      )}
      <div className="w-full md:w-2/3">
        <h3 className="text-2xl font-bold text-orange-400">{title}</h3>
        <p className="text-sm text-gray-400 mb-2">{date}</p>
        <p className="text-gray-200">{description}</p>
      </div>
    </motion.div>
  );
};

const HomePage = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
  
  const events: EventProps[] = [
    {
      title: "Annual Robotics Competition",
      date: "October 15-17, 2023",
      description: "Our flagship event where teams compete to build the most innovative and functional robots. Categories include autonomous navigation, task completion, and creative design.",
      image: "/images/logo.svg"
    },
    {
      title: "Workshop: Introduction to Arduino",
      date: "September 5, 2023",
      description: "A hands-on workshop for beginners to learn the basics of Arduino programming and electronics. Participants will build their own simple robot by the end of the session.",
      image: "/images/logo.svg"
    },
    {
      title: "Tech Talk: Future of AI in Robotics",
      date: "November 10, 2023",
      description: "Join us for an insightful discussion with industry experts about how artificial intelligence is shaping the future of robotics and automation.",
      image: "/images/logo.svg"
    },
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      {/* Hero Section */}
      <motion.div 
        ref={headerRef}
        className="h-screen flex flex-col items-center justify-center relative overflow-hidden"
        style={{ opacity, scale }}
      >
        {/* Particle Links Effect */}
        <ParticleLinks />
        
        <div className="z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <Image 
              src="/images/logo.svg" 
              alt="Valmiki Robotics Logo" 
              width={180} 
              height={180} 
              className="mx-auto mb-8"
              style={{ filter: 'hue-rotate(-10deg) saturate(1.5) brightness(1.0)' }}
            />
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Valmiki Robotics
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            Innovating the future through robotics and technology
          </motion.p>
          
          <motion.div
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            <Link 
              href="#events" 
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-full font-medium hover:from-orange-600 hover:to-orange-700 transition-all duration-300 inline-block"
            >
              Explore Events
            </Link>
            <Link 
              href="/tech-expo" 
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-full font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300 inline-block"
            >
              Tech Expo
            </Link>
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="text-white/70"
          >
            <path 
              d="M12 5L12 19M12 19L6 13M12 19L18 13" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.div>
      
      {/* Events Section */}
      <section id="events" className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Major Events</h2>
          <div className="h-1 w-20 bg-orange-500 mx-auto"></div>
          <p className="mt-6 text-gray-300 max-w-3xl mx-auto">
            Join us for our exciting lineup of robotics events, competitions, and workshops.
          </p>
        </motion.div>
        
        <div className="space-y-8">
          {events.map((event, index) => (
            <Event key={index} {...event} />
          ))}
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-black/50 backdrop-blur-sm py-8 px-4 text-center text-gray-400">
        <div className="max-w-6xl mx-auto">
          <Image 
            src="/images/logo.svg" 
            alt="Valmiki Robotics Logo" 
            width={60} 
            height={60} 
            className="mx-auto mb-4"
            style={{ filter: 'hue-rotate(-10deg) saturate(1.5) brightness(1.0)' }}
          />
          <p className="mb-4">© {new Date().getFullYear()} Valmiki Robotics. All rights reserved.</p>
          <div className="flex justify-center space-x-4">
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            <Link href="/events" className="hover:text-white transition-colors">Events</Link>
            <Link href="/tech-expo" className="hover:text-white transition-colors">Tech Expo</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;