import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false); // Close menu on route change
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <nav className={`navbar-premium ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="container h-full flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="nav-logo-premium flex items-center">
          <img src="/logo.png" alt="Webora S2dio Logo" className="nav-logo-img" />
          <span className="nav-brand-text">Webora S2dio</span>
        </Link>

        {/* Desktop Links */}
        <div className="nav-menu-premium desktop-only">
          <Link to="/" className={`nav-link-premium ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
          <Link to="/services" className={`nav-link-premium ${location.pathname === '/services' ? 'active' : ''}`}>Services</Link>
          <Link to="/portfolio" className={`nav-link-premium ${location.pathname === '/portfolio' ? 'active' : ''}`}>Portfolio</Link>
          <Link to="/about" className={`nav-link-premium ${location.pathname === '/about' ? 'active' : ''}`}>About</Link>
          <Link to="/contact" className={`nav-link-premium ${location.pathname === '/contact' ? 'active' : ''}`}>Contact</Link>
        </div>

        {/* Mobile Toggle Button */}
        <button 
          className="mobile-only flex items-center justify-center mobile-toggle-btn" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} color="var(--text-primary)" /> : <Menu size={28} color="var(--text-primary)" />}
        </button>

      </div>

      {/* Mobile Drodown Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="mobile-menu-wrapper"
          >
            <Link to="/" className={`mobile-link-premium ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
            <Link to="/services" className={`mobile-link-premium ${location.pathname === '/services' ? 'active' : ''}`}>Services</Link>
            <Link to="/portfolio" className={`mobile-link-premium ${location.pathname === '/portfolio' ? 'active' : ''}`}>Portfolio</Link>
            <Link to="/about" className={`mobile-link-premium ${location.pathname === '/about' ? 'active' : ''}`}>About</Link>
            <Link to="/contact" className={`mobile-link-premium ${location.pathname === '/contact' ? 'active' : ''}`}>Contact</Link>
            
            <div className="mt-8">
              <Link to="/request-project" className="btn btn-primary w-full" style={{ padding: '20px' }}>
                Start your project
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
