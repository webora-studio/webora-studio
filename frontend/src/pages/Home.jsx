import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, PenTool, Code, Rocket } from 'lucide-react';
import { SplineScene } from "@/components/ui/spline";
import { Spotlight } from "@/components/ui/spotlight";
import './Home.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const Home = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    { q: "How long does a website take?", a: "Most projects are completed within 3 to 7 days, depending on technical complexity and feature scope." },
    { q: "Do you provide AI solutions?", a: "Yes, we build custom AI automation tools and smart chatbots to help streamline your business workflows." },
    { q: "Is maintenance included?", a: "We provide 30 days of complimentary post-launch support to ensure your systems are running smoothly." },
    { q: "Will the site be mobile-ready?", a: "Every website we build is fully mobile-responsive and optimized for all devices." }
  ];

  return (
    <div className="home-premium bg-grid">
      
      {/* SECTION 1: HERO */}
      <section className="hero-premium relative overflow-hidden" style={{ minHeight: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />
        
        {/* Animated Glow Orbs - Carefully placed to avoid mobile overflow */}
        <div className="glow-orb" style={{ width: 'clamp(200px, 50vw, 600px)', height: 'clamp(200px, 50vw, 600px)', background: 'rgba(0,0,0,0.03)', top: '-10%', right: '-5%' }} />
        <div className="glow-orb" style={{ width: 'clamp(150px, 30vw, 400px)', height: 'clamp(150px, 30vw, 400px)', background: 'rgba(0,0,0,0.02)', bottom: '5%', left: '-5%', animationDelay: '-5s' }} />

        <div className="container relative z-10 w-full hero-container-flex">
          <motion.div 
            initial="hidden" animate="visible" variants={staggerContainer}
            className="hero-content-left"
          >
            <motion.h1 
              variants={fadeUp} 
              className="heading-hero mb-8 leading-tight"
            >
              Professional Websites <br className="desktop-only"/> <span style={{ color: 'var(--primary)' }}>for Your Business</span>
            </motion.h1>
            <motion.p 
              variants={fadeUp} 
              className="hero-subtext text-secondary mb-10 max-w-lg"
            >
              We create modern websites and digital solutions that help businesses grow online.
            </motion.p>
            <motion.div 
              variants={fadeUp} 
              className="hero-cta-group"
              transition={{ delay: 0.4 }}
            >
              <Link to="/contact" className="btn-primary-lg">Start Project</Link>
              <Link to="/services" className="btn-secondary-lg">Our Services</Link>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="hero-robot-right"
          >
            <SplineScene 
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: SERVICES */}
      <section className="section-pad" style={{ background: 'white' }}>
        <div className="container">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="flex flex-col items-center text-center mb-32"
          >
            <motion.h2 variants={fadeUp} className="heading-section">
              Our Services
            </motion.h2>
            <motion.p variants={fadeUp} className="text-body text-secondary max-w-xl">
              Professional websites and smart tools designed to help your business succeed.
            </motion.p>
          </motion.div>
          
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
            className="grid-2-col"
            style={{ gap: '64px' }}
          >
            {[
              { title: "Modern Websites", desc: "Professional websites designed to attract customers." },
              { title: "AI Automation", desc: "Automate repetitive work and save time using AI tools." },
              { title: "AI Chatbots", desc: "Chatbots that automatically answer customer questions." },
              { title: "Business Automation", desc: "Automate WhatsApp, email, and CRM tasks." }
            ].map((srv, idx) => (
              <motion.div variants={fadeUp} key={idx} className="card-glass text-center">
                <div className="service-icon-wrap">
                   <div className="icon-circle">
                      <Plus size={32} />
                   </div>
                </div>
                <h3 className="heading-sub mb-4">{srv.title}</h3>
                <p className="text-secondary text-body">{srv.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: PORTFOLIO / SHOWCASE */}
      <section className="section-pad" style={{ background: 'white' }}>
        <div className="container">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} 
            className="mb-24"
          >
            <h2 className="heading-section text-left mb-4">Selected Showcase</h2>
          </motion.div>
          
          <div className="grid-2-col" style={{ gap: '64px' }}>
            {[
              { 
                title: "Ecommerce Website", 
                desc: "Modern shopping experience with product filtering and responsive UI.", 
                img: "/ecommerce.png",
                link: "https://clothing-store-beryl-one.vercel.app"
              },
              { 
                title: "Gym Landing Page", 
                desc: "Premium fitness interface with performance scheduling.", 
                img: "/gym.png",
                link: "https://gym-landing-page-pied-three.vercel.app"
              },
              { 
                title: "Restaurant Website", 
                desc: "Elegant dining experience with menu display and online reservations.", 
                img: "/restaurant.png",
                link: "https://restaurant-website-five-azure.vercel.app"
              },
              { 
                title: "AI SaaS Platform", 
                desc: "Next-gen software solution with intelligent automation features.", 
                img: "/Ai-SAAS.png",
                link: "https://ai-chatbot-seven.vercel.app"
              }
            ].map((work, idx) => (
              <motion.a 
                key={idx} 
                href={work.link || "#"} 
                target={work.link ? "_blank" : "_self"}
                rel={work.link ? "noopener noreferrer" : ""}
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="portfolio-premium-card group block"
              >
                <div className="port-img-wrap overflow-hidden rounded-3xl" style={{ aspectRatio: '16/10' }}>
                  <motion.img 
                    whileHover={{ scale: 1.05 }} 
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} 
                    src={work.img} alt={work.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div className="mt-10 px-2">
                  <h3 className="heading-sub mb-3 group-hover:text-primary transition-colors" style={{ fontSize: '32px' }}>{work.title}</h3>
                  <p className="text-secondary text-body leading-relaxed">{work.desc}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: PROCESS */}
      <section className="section-pad" style={{ background: 'var(--bg-secondary)', borderRadius: '80px 80px 0 0' }}>
        <div className="container">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="heading-section mb-32">
            Our Process
          </motion.h2>
          
          <div className="process-timeline" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '64px' }}>
            {[
              { title: "Understanding", desc: "We start by understanding your specific business needs.", icon: Search },
              { title: "Designing", desc: "Creating a professional design that fits your brand.", icon: PenTool },
              { title: "Developing", desc: "Building your project with high-quality code.", icon: Code },
              { title: "Launching", desc: "Successfully launching and providing support.", icon: Rocket }
            ].map((step, idx) => (
              <motion.div key={idx} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="process-step">
                <div className="process-icon-row mb-10">
                   <div className="process-icon-box">
                      <step.icon size={28} />
                   </div>
                   <div className="process-line"></div>
                </div>
                <h4 className="heading-sub mb-4">{step.title}</h4>
                <p className="text-secondary text-body">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: PRICING */}
      <section className="section-pad" style={{ background: 'white' }}>
        <div className="container">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="text-center mb-24"
          >
            <motion.h2 variants={fadeUp} className="heading-section">Simple Pricing</motion.h2>
            <motion.p variants={fadeUp} className="text-body text-secondary max-w-xl mx-auto">
              Professional services with clear investment tiers for every business.
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="pricing-grid-premium"
          >
            {[
              { 
                type: "Starter Website", 
                theme: "theme-starter",
                target: "Best for small businesses",
                price: "₹4,000",
                range: "Starts from",
                features: ["Modern professional design", "Mobile responsive layout", "Basic SEO setup", "Contact form integration", "3–5 essential pages"] 
              },
              { 
                type: "Business Website", 
                theme: "theme-business",
                popular: true,
                target: "Best for growing businesses",
                price: "₹10,000",
                range: "Tailored solution",
                features: ["Premium custom UI/UX", "Full SEO optimization", "Advanced sections & blogs", "Performance optimization", "30 days priority support"] 
              },
              { 
                type: "AI Automation", 
                theme: "theme-ai",
                target: "For advanced automation",
                price: "Custom",
                range: "Based on scope",
                features: ["Custom AI chatbot", "WhatsApp automation", "Email workflow setup", "CRM integration", "Continuous AI training"] 
              }
            ].map((plan, i) => (
              <motion.div 
                key={i} 
                variants={fadeUp}
                whileHover={{ y: -10 }}
                className={`pricing-card-base ${plan.theme}`}
              >
                {plan.popular && <div className="card-tag-popular">Most Popular</div>}
                
                <div className="pricing-header-wrap">
                  <h3 className="heading-sub mb-2">{plan.type}</h3>
                  <p className="text-secondary font-bold uppercase tracking-widest" style={{ fontSize: '12px' }}>{plan.target}</p>
                </div>

                <div className="pricing-amount-wrap">
                  {plan.price !== "Custom" ? (
                    <>
                      <span className="pricing-currency">₹</span>
                      <span className="pricing-amount">{plan.price.replace('₹', '')}</span>
                      <p className="text-secondary mt-2" style={{ fontSize: '14px' }}>{plan.range}</p>
                    </>
                  ) : (
                    <>
                      <span className="pricing-amount">{plan.price}</span>
                      <p className="text-secondary mt-2" style={{ fontSize: '14px' }}>{plan.range}</p>
                    </>
                  )}
                </div>

                <div className="feature-list-premium">
                  {plan.features.map((feat, fi) => (
                    <div key={fi} className="feature-item-premium">
                      <div className="feature-icon-wrap">
                        <Plus size={18} color="var(--primary)" />
                      </div>
                      <span className="opacity-90">{feat}</span>
                    </div>
                  ))}
                </div>

                <Link to={`/contact?service=${plan.type}`} className="btn-primary-lg w-full" style={{ padding: '20px' }}>
                  Get details
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 6: TRUST */}
      <section className="section-pad" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="grid-3-col" style={{ gap: '24px' }}>
            {[
              "Modern UI design", "Mobile responsive", "Fast loading websites", 
              "SEO friendly structure", "AI powered solutions", "Business-focused approach"
            ].map((trust, i) => (
              <motion.div 
                key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="card-glass" style={{ padding: '32px', textAlign: 'center' }}
              >
                <h4 className="heading-sub" style={{ fontSize: '20px' }}>{trust}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: FAQ */}
      <section className="section-pad" style={{ background: 'white' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="heading-section mb-20">
            Common Questions
          </motion.h2>
          <div className="flex flex-col">
            {faqs.map((f, i) => (
              <motion.div 
                key={i} 
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="faq-item-premium"
              >
                <button 
                  className="faq-head flex justify-between items-center"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <h3 className="faq-q">{f.q}</h3>
                  <div className="faq-icon-wrap" style={{ transform: openFaq === i ? 'rotate(45deg)' : 'none' }}>
                    <Plus size={24} color="var(--primary)" />
                  </div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-10 text-secondary leading-relaxed" style={{ fontSize: '20px', maxWidth: '800px' }}>{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: FINAL CTA */}
      <section className="final-cta-section relative overflow-hidden">
        {/* Subtle Light Beam Effect */}
        <div className="glow-orb" style={{ width: '800px', height: '400px', background: 'rgba(255,255,255,0.05)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', filter: 'blur(120px)' }} />
        
        <div className="container text-center relative z-10">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="max-w-4xl mx-auto">
              <h2 className="heading-hero mb-16 text-white mx-auto text-center" style={{ position: 'relative', zIndex: 5 }}>
                Ready to <br/> grow your <span style={{ opacity: 1, color: '#FFFFFF' }}>Business?</span>
              </h2>
              <Link to="/contact" className="btn-primary-lg bg-white text-black" style={{ position: 'relative', zIndex: 5 }}>
                Contact us
              </Link>
            </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Home;
