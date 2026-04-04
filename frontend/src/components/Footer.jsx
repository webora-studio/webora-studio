import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer-main">
      <div className="container grid-4-col footer-parallel mb-24">
        
        <div className="flex flex-col gap-6">
          <Link to="/" className="footer-logo-wrap flex items-center">
            <img src="/logo.png" alt="Webora S2dio Logo" className="footer-logo-img" />
            <span className="nav-brand-text">Webora S2dio</span>
          </Link>
          <p className="footer-bio text-secondary text-body" style={{ opacity: 0.7 }}>
            We build modern websites and AI tools that help your business grow.
          </p>
        </div>
        
        <div className="flex flex-col gap-6">
          <h4 className="summary-label">Quick Links</h4>
          <Link to="/about" className="footer-link">About Us</Link>
          <Link to="/portfolio" className="footer-link">Portfolio</Link>
          <Link to="/contact" className="footer-link">Contact</Link>
          <Link to="/services" className="footer-link">Services</Link>
        </div>

        <div className="flex flex-col gap-6">
          <h4 className="summary-label">Services</h4>
          <Link to="/services" className="footer-link">Modern Websites</Link>
          <Link to="/services" className="footer-link">AI Chatbots</Link>
          <Link to="/services" className="footer-link">Business Automation</Link>
          <Link to="/services" className="footer-link">UI/UX Design</Link>
        </div>

        <div className="flex flex-col gap-6">
          <h4 className="summary-label">Contact</h4>
          <a href="mailto:weboras2dio@gmail.com" className="footer-link">weboras2dio@gmail.com</a>
          <a href="https://wa.me/918870687173" target="_blank" rel="noreferrer" className="footer-link">WhatsApp Support</a>
          <span className="text-secondary opacity-40 mt-4" style={{ fontSize: '13px', fontWeight: 600 }}>Trichy, India</span>
        </div>
      </div>
      
      <div className="container footer-bottom">
        &copy; {new Date().getFullYear()} Webora S2dio. Built for modern businesses.
      </div>
    </footer>
  );
};

export default Footer;
