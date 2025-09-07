'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white pt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <main className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Our Club</h1>
          <div className="h-1 w-20 bg-orange-500 mx-auto"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Image 
              src="/images/logo.png" 
              alt="Valmiki Robotics Team" 
              width={400} 
              height={400} 
              className="rounded-lg w-full h-auto"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-orange-400">Our Mission</h2>
            <p className="text-gray-300">
              Valmiki Robotics is dedicated to fostering innovation, creativity, and technical excellence in the field of robotics. 
              Our club provides a collaborative environment where students can explore cutting-edge technologies, 
              develop practical engineering skills, and prepare for future careers in STEM fields.
            </p>
            
            <h2 className="text-3xl font-bold text-orange-400">What We Do</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Participate in national and international robotics competitions</li>
              <li>Organize workshops and training sessions for beginners and advanced members</li>
              <li>Collaborate with industry partners on real-world projects</li>
              <li>Host tech talks and networking events with professionals</li>
              <li>Mentor younger students interested in robotics and programming</li>
            </ul>
          </motion.div>
        </div>
        
        <motion.section 
          className="mt-24"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <motion.div 
                key={i}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 * i }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl font-bold text-white">{i}</span>
                </div>
                <h3 className="text-xl font-bold text-orange-400">Team Member {i}</h3>
                <p className="text-gray-400 mb-2">Role / Position</p>
                <p className="text-gray-300 text-sm">Short bio about the team member and their contributions to the robotics club.</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
        
        <motion.div
          className="mt-24 text-center bg-gradient-to-r from-orange-600/20 to-orange-500/20 rounded-xl p-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <h2 className="text-3xl font-bold mb-4">Join Our Club</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-6">
            Interested in robotics, programming, or engineering? We're always looking for passionate new members to join our team!
          </p>
          <Link 
            href="/"
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-full font-medium hover:from-orange-600 hover:to-orange-700 transition-all duration-300 inline-block"
          >
            Get Involved
          </Link>
        </motion.div>
      </main>
      
      <footer className="bg-black/50 backdrop-blur-sm py-8 px-4 text-center text-gray-400 mt-16">
        <div className="max-w-6xl mx-auto">
          <Image 
            src="/images/logo.png" 
            alt="Valmiki Robotics Logo" 
            width={60} 
            height={60} 
            className="mx-auto mb-4"
          />
          <p className="mb-4">© {new Date().getFullYear()} Valmiki Robotics. All rights reserved.</p>
          <div className="flex justify-center space-x-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            <Link href="/events" className="hover:text-white transition-colors">Events</Link>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}