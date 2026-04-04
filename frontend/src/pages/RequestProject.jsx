import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout, Sparkles, Zap, PenTool, Plus } from 'lucide-react';

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -30, transition: { duration: 0.3 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const RequestProject = () => {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState(null);
  const [formData, setFormData] = useState({
    service: '',
    budget_range: '',
    timeline: '',
    name: '',
    email: '',
    phone: ''
  });

  const next = () => setStep(s => Math.min(s + 1, 4));
  const prev = () => setStep(s => Math.max(s - 1, 1));
  const select = (k, v) => { setFormData({ ...formData, [k]: v }); next(); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/request-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) setStatus('success'); else setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="container text-center" style={{ paddingTop: '200px', minHeight: '100vh' }}>
        <motion.div variants={fadeUp} className="max-w-md mx-auto">
          <div className="mb-8 flex justify-center">
            <div style={{ padding: '24px', background: 'var(--bg-secondary)', borderRadius: '50%' }}>
              <Sparkles size={48} color="var(--primary)" />
            </div>
          </div>
          <motion.h1 className="heading-section mb-6">Request Received</motion.h1>
          <motion.p className="text-body text-secondary mb-10 leading-relaxed">
            Thank you, {formData.name}. We've received your project details. Our team will review the scope and reach out within 24 hours.
          </motion.p>
          <motion.button className="btn btn-primary" onClick={() => window.location.href = '/' }>
            Return Home
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="section-pad bg-grid" style={{ minHeight: '100vh', background: 'linear-gradient(135deg, var(--bg-color), var(--bg-secondary))' }}>
      <div className="container relative z-10">
        <motion.div variants={fadeUp} className="max-w-5xl mx-auto">
          {/* Progress Indicator */}
          <div className="mb-20" style={{ position: 'relative' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', width: '100%', minHeight: '40px' }}>
              
              {/* Left Spacer to keep Phase centered */}
              <div></div>

              {/* Centered Phase Badge */}
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <span className="step-ultra-text" style={{ margin: 0, padding: '8px 20px', display: 'flex', alignItems: 'center', height: '36px' }}>
                  Step 0{step} of 04
                </span>
              </div>

              {/* Right Aligned Back Button */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                {step > 1 && (
                  <button 
                    onClick={prev} 
                    className="step-ultra-text flex items-center hover:opacity-70 transition-opacity" 
                    style={{ background: 'transparent', margin: 0, padding: 0, height: '36px', border: 'none' }}
                  >
                    Go Back <Plus size={16} style={{ marginLeft: '8px' }} />
                  </button>
                )}
              </div>
            </div>
            
            <div className="flex justify-center gap-3">
              {[1, 2, 3, 4].map(i => (
                <div 
                  key={i} 
                  className={`h-2 rounded-full transition-all duration-700 ease-in-out ${i <= step ? 'bg-black w-16' : 'bg-gray-200 w-8'}`}
                />
              ))}
            </div>
          </div>

          {/* Multi-Step Intake Engine */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="step1" className="card-glass" style={{ padding: '80px 48px' }} initial={{ opacity: 0, scale: 0.98, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98, y: -30 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
                  <h2 className="heading-hero text-center mb-20 tracking-tighter" style={{ fontSize: '72px', lineHeight: '1.05' }}>What service <br/> do you need?</h2>
                  <div className="grid-2-col" style={{ gap: '32px' }}>
                    {[{ name: 'Modern Websites', desc: 'Professional websites designed to attract customers.', icon: Layout },
                       { name: 'AI Chatbots', desc: 'Chatbots that automatically answer customer questions.', icon: Sparkles },
                       { name: 'Business Automation', desc: 'Automate WhatsApp, email, and CRM tasks.', icon: Zap },
                       { name: 'UI UX Design', desc: 'Clean and modern design focused on usability.', icon: PenTool }].map((opt, i) => (
                      <motion.button 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 + 0.3, duration: 0.6 }}
                        key={opt.name} 
                        onClick={() => select('service', opt.name)} 
                        className="opt-ultra group"
                      >
                        <div className="opt-ultra-icon">
                          <opt.icon size={40} strokeWidth={1.5} />
                        </div>
                        <span className="opt-ultra-title">{opt.name}</span>
                        <span className="opt-ultra-desc">{opt.desc}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" className="card-glass" style={{ padding: '80px 48px' }} initial={{ opacity: 0, scale: 0.98, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98, y: -30 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
                  <h2 className="heading-hero text-center mb-20 tracking-tighter" style={{ fontSize: '72px', lineHeight: '1.05' }}>Select your <br/> budget.</h2>
                  <div className="grid-2-col" style={{ gap: '32px' }}>
                    {['Under ₹50k', '₹50k - ₹1.5L', '₹1.5L - ₹5L', 'Custom Enterprise'].map((opt, i) => (
                      <motion.button 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 + 0.3 }}
                        key={opt} 
                        onClick={() => select('budget_range', opt)} 
                        className="opt-ultra"
                        style={{ padding: '56px 32px' }}
                      >
                        <span className="opt-ultra-title" style={{ margin: 0, fontSize: '32px' }}>{opt}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" className="card-glass" style={{ padding: '80px 48px' }} initial={{ opacity: 0, scale: 0.98, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98, y: -30 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
                  <h2 className="heading-hero text-center mb-20 tracking-tighter" style={{ fontSize: '72px', lineHeight: '1.05' }}>When do you <br/> need it?</h2>
                  <div className="grid-2-col" style={{ gap: '32px' }}>
                    {['Immediate', '2-4 Weeks', '2-3 Months', 'Ongoing Architecture'].map((opt, i) => (
                      <motion.button 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 + 0.3 }}
                        key={opt} 
                        onClick={() => select('timeline', opt)} 
                        className="opt-ultra"
                        style={{ padding: '56px 32px' }}
                      >
                        <span className="opt-ultra-title" style={{ margin: 0, fontSize: '32px' }}>{opt}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div key="step4" className="card-glass" style={{ padding: '80px 48px' }} initial={{ opacity: 0, scale: 0.98, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
                  <h2 className="heading-hero text-center mb-20 tracking-tighter" style={{ fontSize: '72px', lineHeight: '1.0' }}>Your details.</h2>
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '40px', width: '100%', maxWidth: '42rem', margin: '0 auto' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                      <div>
                        <label className="label-ultra">Your Name</label>
                        <input required className="input-ultra" type="text" name="name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Full Name" />
                      </div>
                      <div>
                        <label className="label-ultra">Email Address</label>
                        <input required className="input-ultra" type="email" name="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="hello@company.com" />
                      </div>
                      <div>
                        <label className="label-ultra">Phone number</label>
                        <input className="input-ultra" type="text" name="phone" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} placeholder="Phone (Optional)" />
                      </div>
                    </div>
                    
                    <div style={{ background: '#000000', color: '#FFFFFF', padding: '40px', marginTop: '16px', borderRadius: '32px', boxShadow: '0 40px 100px rgba(0,0,0,0.2)' }}>
                      <span className="step-ultra-text" style={{ display: 'inline-block', marginBottom: '32px', background: 'rgba(255,255,255,0.1)', color: '#FFFFFF' }}>Summary</span>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        {[
                          { label: 'Service', val: formData.service },
                          { label: 'Budget', val: formData.budget_range },
                          { label: 'Timeline', val: formData.timeline }
                        ].map((item, idx) => (
                          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '24px' }}>
                             <span style={{ fontSize: '13px', fontWeight: 'bold', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{item.label}</span>
                             <span style={{ fontSize: '18px', fontWeight: '800', letterSpacing: '-0.02em', color: '#FFFFFF' }}>{item.val}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button disabled={status === 'loading'} type="submit" className="btn-ultra-lg" style={{ marginTop: '24px' }}>
                      {status === 'loading' ? 'Sending...' : 'Get started'}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RequestProject;
