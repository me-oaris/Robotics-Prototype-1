'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface EventProps {
  title: string;
  date: string;
  description: string;
  image?: string;
  location: string;
}

const EventCard = ({ title, date, description, image, location, index }: EventProps & { index: number }) => {
  return (
      <motion.div
        className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 + (index * 0.1) }}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
      >
      {image && (
        <div className="h-48 relative">
          <Image 
            src={image} 
            alt={title} 
            fill 
            className="object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-orange-400">{title}</h3>
        <div className="flex justify-between items-center mt-2 mb-4">
          <p className="text-sm text-gray-400">{date}</p>
          <p className="text-sm text-gray-400">{location}</p>
        </div>
        <p className="text-gray-300">{description}</p>
        <div className="mt-4">
          <Link 
            href="#"
            className="text-orange-400 hover:text-orange-300 transition-colors"
          >
            Learn more →
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default function EventsPage() {
  const events: EventProps[] = [
    {
      title: "Annual Robotics Competition",
      date: "October 15-17, 2023",
      location: "Main Campus Auditorium",
      description: "Our flagship event where teams compete to build the most innovative and functional robots. Categories include autonomous navigation, task completion, and creative design.",
      image: "/images/logo.png"
    },
    {
      title: "Workshop: Introduction to Arduino",
      date: "September 5, 2023",
      location: "Engineering Lab 101",
      description: "A hands-on workshop for beginners to learn the basics of Arduino programming and electronics. Participants will build their own simple robot by the end of the session.",
      image: "/images/logo.png"
    },
    {
      title: "Tech Talk: Future of AI in Robotics",
      date: "November 10, 2023",
      location: "Virtual Event",
      description: "Join us for an insightful discussion with industry experts about how artificial intelligence is shaping the future of robotics and automation.",
      image: "/images/logo.png"
    },
    {
      title: "Robotics Hackathon",
      date: "December 3-4, 2023",
      location: "Innovation Center",
      description: "A 48-hour hackathon where participants will work in teams to solve real-world problems using robotics and automation technologies.",
      image: "/images/logo.png"
    },
    {
      title: "Field Trip: Industry Visit",
      date: "January 20, 2024",
      location: "TechRobotics Inc.",
      description: "An exclusive opportunity to visit a leading robotics company and see how industrial robots are designed, built, and programmed.",
      image: "/images/logo.png"
    },
    {
      title: "Beginner's Robotics Workshop",
      date: "February 15, 2024",
      location: "Engineering Lab 202",
      description: "A workshop designed for complete beginners to get started with robotics. No prior experience required!",
      image: "/images/logo.png"
    },
  ];

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white pt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <header className="py-6 px-4 md:px-8 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Upcoming Events</h1>
          <div className="h-1 w-20 bg-orange-500 mx-auto"></div>
          <p className="mt-6 text-gray-300 max-w-3xl mx-auto">
            Join us for our exciting lineup of robotics events, competitions, workshops, and more.
          </p>
        </motion.div>
      </header>
      
      <main className="py-8 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <EventCard key={index} {...event} index={index} />
          ))}
        </div>
        
        <motion.div
          className="mt-24 text-center bg-gradient-to-r from-orange-600/20 to-orange-500/20 rounded-xl p-8"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl font-bold mb-4">Host Your Own Event</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-6">
            Have an idea for a robotics event or workshop? We're open to collaborations and new initiatives!
          </p>
          <Link 
            href="/"
            className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-8 py-3 rounded-full font-medium hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 inline-block"
          >
            Submit Proposal
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
            <Link href="/events" className="hover:text-white transition-colors">Events</Link>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}