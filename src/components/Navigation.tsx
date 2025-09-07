'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeBubbleStyle, setActiveBubbleStyle] = useState({});
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/events', label: 'Events' },
    { href: '/tech-expo', label: 'Tech Expo' },
    { href: '/contact', label: 'Contact' }
  ];
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateBubblePosition = () => {
      if (navRef.current) {
        const activeLink = navRef.current.querySelector(`[href="${pathname}"]`) as HTMLElement;
        if (activeLink) {
          const navContainer = navRef.current;
          const navRect = navContainer.getBoundingClientRect();
          
          const linkRect = activeLink.getBoundingClientRect();
          
          const left = linkRect.left - navRect.left;
          const top = linkRect.top - navRect.top;
          
          const newBubbleStyle = {
            left: left,
            top: top,
            width: linkRect.width,
            height: linkRect.height,
            opacity: 1,
          };
          
          setActiveBubbleStyle(newBubbleStyle);
        }
      }
    };

    updateBubblePosition();
    
    window.addEventListener('resize', updateBubblePosition);
    
    return () => {
      window.removeEventListener('resize', updateBubblePosition);
    };
  }, [pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleNavigationClick = () => {
  };
  
  return (
    <motion.header 
      className={`fixed top-4 left-4 right-4 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl py-4' 
          : 'bg-white/5 backdrop-blur-lg border border-white/10 py-4'
      } rounded-2xl`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" onClick={closeMobileMenu}>
          <div className="flex items-center">
            <Image 
              src="/images/logo.svg" 
              alt="Valmiki Robotics Logo" 
              width={56} 
              height={56} 
              style={{ filter: 'hue-rotate(-10deg) saturate(1.5) brightness(1.0)' }}
              className="hover:scale-110 transition-transform duration-300"
            />
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:block" ref={navRef}>
          <div className="relative">
            {/* Liquid Glass Bubble */}
            <motion.div
              className="absolute bg-orange-400/30 backdrop-blur-md border border-orange-400/50 rounded-full shadow-lg"
              style={activeBubbleStyle}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 15,
                mass: 1.2,
                duration: 0.8
              }}
              layout
              layoutId="nav-bubble"
            />
            
            <ul className="flex gap-8 relative z-10">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link 
                    href={item.href} 
                    onClick={handleNavigationClick}
                    className={`relative transition-all duration-300 px-4 py-2 rounded-full ${
                      pathname === item.href 
                        ? 'text-orange-400' 
                        : 'text-white hover:text-orange-400'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300"
        >
          <motion.div
            animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </motion.div>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
          >
            <div className="px-6 py-4 border-t border-white/20 mt-4">
              <nav>
                <ul className="space-y-4">
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <Link 
                        href={item.href} 
                        onClick={() => {
                          closeMobileMenu();
                          handleNavigationClick();
                        }}
                        className={`block transition-all duration-300 px-4 py-3 rounded-full ${
                          pathname === item.href 
                            ? 'text-orange-400 bg-orange-400/20' 
                            : 'text-white hover:text-orange-400 hover:bg-white/10'
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navigation;