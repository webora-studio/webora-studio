import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const About = () => {
  return (
    <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="about-page bg-grid" style={{ paddingTop: '160px', minHeight: '100vh', paddingBottom: '120px' }}>
      
      {/* Hero Visual Block */}
      <section className="container mb-24 text-center">
        <motion.div variants={fadeUp} className="max-w-4xl mx-auto mb-16">
          <h1 className="heading-hero mb-8">
            We build modern websites <br/> and AI tools that help <span style={{ color: 'var(--primary)' }}>your business grow.</span>
          </h1>
          <p className="text-body text-secondary max-w-2xl mx-auto leading-relaxed" style={{ fontSize: '20px' }}>
            Professional websites and smart automation solutions. Simple digital solutions for modern businesses.
          </p>
        </motion.div>
        
        <motion.div variants={fadeUp} className="w-full relative" style={{ height: '600px', borderRadius: '48px', overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,0.1)' }}>
          <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80" alt="Webora Team Workspace" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(180deg, rgba(247,248,249,0) 0%, rgba(28,31,36,0.3) 100%)' }}></div>
        </motion.div>
      </section>

      {/* Metrics & Values */}
      <section className="section-pad">
        <div className="container">
          <div className="grid-2-col gap-24 items-center">
            <motion.div variants={fadeUp} className="max-w-xl">
              <h2 className="heading-section mb-8 text-left" style={{ fontSize: '56px', letterSpacing: '-0.04em' }}>Simple and <br/> modern design.</h2>
              <p className="text-secondary text-body mb-8 leading-relaxed" style={{ fontSize: '20px', opacity: 0.8 }}>
                We focus on creating clean, professional, and trustworthy websites that clearly explain your business value. Our goal is to make your business stand out with simple and digital solutions.
              </p>
            </motion.div>

            <motion.div variants={staggerContainer} className="grid-2-col" style={{ gap: '32px' }}>
              <motion.div variants={fadeUp} className="card-glass" style={{ padding: '48px' }}>
                <h3 className="heading-hero mb-2" style={{ fontSize: '56px', color: 'var(--primary)' }}>Fast</h3>
                <p className="text-secondary font-weight-bold" style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.15em', opacity: 0.6 }}>Delivery</p>
              </motion.div>
              <motion.div variants={fadeUp} className="card-glass" style={{ padding: '48px' }}>
                <h3 className="heading-hero mb-2" style={{ fontSize: '56px', color: 'var(--primary)' }}>Modern</h3>
                <p className="text-secondary font-weight-bold" style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.15em', opacity: 0.6 }}>Design</p>
              </motion.div>
              <motion.div variants={fadeUp} className="card-glass" style={{ padding: '48px', background: 'var(--primary)', color: 'white' }}>
                <h3 className="heading-hero mb-2" style={{ fontSize: '56px', color: 'white' }}>AI</h3>
                <p className="text-white font-weight-bold" style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.15em', opacity: 0.8 }}>Powered</p>
              </motion.div>
              <motion.div variants={fadeUp} className="card-glass" style={{ padding: '48px' }}>
                <h3 className="heading-hero mb-2" style={{ fontSize: '56px', color: 'var(--primary)' }}>24/7</h3>
                <p className="text-secondary font-weight-bold" style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.15em', opacity: 0.6 }}>Reliable Support</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

    </motion.div>
  );
};

export default About;
