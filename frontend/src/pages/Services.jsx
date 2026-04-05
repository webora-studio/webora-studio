import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const Services = () => {
  const categories = [
    { title: "Modern Websites", desc: "Professional websites designed to attract customers.", button: "Get started" },
    { title: "AI Automation", desc: "Automate repetitive work and save time using AI tools.", button: "Get started" },
    { title: "AI Chatbots", desc: "Chatbots that automatically answer customer questions.", button: "Get started" },
    { title: "Business Automation", desc: "Automate WhatsApp, email, and CRM tasks.", button: "Get started" },
    { title: "Custom Software", desc: "Custom-built solutions based on your business needs.", button: "Get started" }
  ];

  return (
    <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="services-page bg-grid section-pad" style={{ minHeight: '100vh' }}>
      <section className="container mb-24 text-center">
        <motion.h1 variants={fadeUp} className="heading-hero mb-8">Professional websites and smart <span style={{ color: 'var(--primary)' }}>automation solutions.</span></motion.h1>
        <motion.p variants={fadeUp} className="text-body text-secondary max-w-2xl mx-auto leading-relaxed">
          Simple digital solutions for modern businesses. We help you grow by building modern websites and using AI tools.
        </motion.p>
      </section>

      <section className="container section-pad pt-0">
        <motion.div variants={staggerContainer} className="grid-2-col">
          {categories.map((cat, idx) => (
            <motion.div variants={fadeUp} key={idx} className="card-glass flex flex-col justify-start items-start" style={{ minHeight: '320px' }}>
              <div className="w-full">
                <h2 className="heading-sub mb-6">{cat.title}</h2>
                <p className="text-secondary text-body mb-12 leading-relaxed" style={{ opacity: 0.8 }}>{cat.desc}</p>
              </div>
              
              <div style={{ marginTop: 'auto', width: '100%' }}>
                <Link to="/contact" className="btn-primary-lg w-full">
                  Contact us
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </motion.div>
  );
};

export default Services;
