import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const Portfolio = () => {
  const projects = [
    { 
      title: 'Ecommerce Website', 
      desc: 'Minimalist eCommerce storefront with full cart functionality.', 
      img: '/ecommerce.png',
      link: 'https://clothing-store-beryl-one.vercel.app'
    },
    { 
      title: 'Gym Landing Page', 
      desc: 'Membership conversions and performance scheduling.', 
      img: '/gym.png',
      link: 'https://gym-landing-page-pied-three.vercel.app'
    },
    { 
      title: 'Restaurant Website', 
      desc: 'Elegant dining experience with menu display and online reservations.', 
      img: '/restaurant.png',
      link: 'https://restaurant-website-five-azure.vercel.app'
    },
    { 
      title: 'AI SaaS Platform', 
      desc: 'Next-gen software solution with intelligent automation features.', 
      img: '/Ai-SAAS.png',
      link: 'https://ai-chatbot-seven.vercel.app'
    }
  ];

  return (
    <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="portfolio-page bg-grid" style={{ paddingTop: '160px', minHeight: '100vh', paddingBottom: '120px' }}>
      <section className="container mb-24 text-center">
        <motion.h1 variants={fadeUp} className="heading-hero mb-8">Selected <span style={{ color: 'var(--primary)' }}>Case Studies.</span></motion.h1>
        <motion.p variants={fadeUp} className="text-body text-secondary max-w-xl mx-auto leading-relaxed">
          Explore our recent digital products blending premium aesthetics with precision-engineered code.
        </motion.p>
      </section>

      <section className="container">
        <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24">
          {projects.map((p, i) => (
            <motion.a 
              href={p.link || "#"}
              target={p.link ? "_blank" : "_self"}
              rel="noopener noreferrer"
              variants={fadeUp} 
              key={i} 
              className={`portfolio-premium-card group block ${i % 3 === 0 ? 'md:col-span-12' : 'md:col-span-6'}`}
            >
              <div 
                className="port-img-wrap relative" 
                style={{ 
                  aspectRatio: i % 3 === 0 ? '21/9' : '16/10', 
                  borderRadius: '48px', 
                  overflow: 'hidden', 
                  border: '1px solid rgba(0,0,0,0.05)', 
                  background: '#f8f9fa', 
                  boxShadow: '0 20px 60px rgba(0,0,0,0.05)' 
                }}
              >
                <motion.img 
                  whileHover={{ scale: 1.05 }} 
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }} 
                  src={p.img} alt={p.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-700 pointer-events-none" />
              </div>
              <div className="port-content mt-12 px-4">
                <div className="flex justify-between items-end gap-10">
                   <div className="flex-1">
                      <h2 className="heading-sub mb-4 tracking-tighter group-hover:text-primary transition-colors" style={{ fontSize: i % 3 === 0 ? '56px' : '42px', lineHeight: '1.1' }}>{p.title}</h2>
                      <p className="text-secondary text-body max-w-xl" style={{ fontSize: '20px', opacity: 0.8 }}>{p.desc}</p>
                   </div>
                   <div className="hidden md:flex">
                      <div className="w-16 h-16 rounded-full border border-divider flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-500">
                         <Plus size={24} className="group-hover:text-white transition-all duration-500" />
                      </div>
                   </div>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </section>
    </motion.div>
  );
};

export default Portfolio;
