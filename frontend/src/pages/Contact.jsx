import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Plus, ChevronDown } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const Contact = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '', business_name: '', email: '', phone: '', service_needed: '', budget_range: '', message: ''
  });
  const [status, setStatus] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const service = params.get('service');
    if (service) {
      setFormData(prev => ({ ...prev, service_needed: service }));
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) setStatus('success');
      else { setStatus('error'); setErrorMsg('Server rejected the request.'); }
    } catch {
      setStatus('error');
      setErrorMsg('Network error.');
    }
  };

  if (status === 'success') {
    return (
      <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="container" style={{ minHeight: '100vh' }}>
        <motion.div variants={fadeUp} className="success-hero">
          <div className="mb-8 flex justify-center">
            <div className="icon-circle">
              <Mail size={48} color="white" />
            </div>
          </div>
          <motion.h1 className="heading-section mb-6">Message Sent</motion.h1>
          <motion.p className="text-secondary mb-10 text-center mx-auto" style={{ fontSize: 'var(--fs-body)', maxWidth: '480px' }}>
            Thank you, {formData.name}. We've received your message and will be in touch within 24 hours.
          </motion.p>
          <motion.button className="btn btn-primary" onClick={() => window.location.href = '/' }>
            Return Home
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="section-pad bg-grid relative overflow-hidden" style={{ minHeight: '100vh', background: 'linear-gradient(135deg, var(--bg-color), var(--bg-secondary))' }}>
      {/* Aesthetic Background Glow */}
      <div className="glow-orb" style={{ width: '600px', height: '600px', background: 'rgba(0,0,0,0.02)', top: '-100px', left: '-200px' }} />
      
      <div className="container relative z-10">
        <motion.div variants={fadeUp} className="max-w-4xl mx-auto mb-20 text-center">
          <span className="step-ultra-text mb-6">Contact us</span>
          <h1 className="heading-hero mb-8 tracking-tighter">Start your project.</h1>
          <p className="hero-subtext text-secondary mx-auto">
            Tell us about your requirements and we'll get back to you with a tailored solution.
          </p>
        </motion.div>
        
        <motion.div variants={fadeUp} className="max-w-4xl mx-auto">
          <div className="card-glass card-contact">
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
              <div className="grid-2-col">
                <div>
                  <label className="label-ultra">Your Name</label>
                  <input required className="input-ultra" type="text" name="name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Full Name" />
                </div>
                <div>
                  <label className="label-ultra">Business Name</label>
                  <input required className="input-ultra" type="text" name="business_name" value={formData.business_name} onChange={e => setFormData({ ...formData, business_name: e.target.value })} placeholder="Company Name" />
                </div>
              </div>
              
              <div>
                <label className="label-ultra">Email Address</label>
                <input required className="input-ultra" type="email" name="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="hello@company.com" />
              </div>
              
              <div>
                <label className="label-ultra">Phone Number</label>
                <input required className="input-ultra" type="tel" name="phone" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} placeholder="+91 00000 00000" />
              </div>
              
              <div className="grid-2-col">
                <div className="select-wrapper">
                  <label className="label-ultra">Service needed</label>
                  <select required className="input-ultra" name="service_needed" value={formData.service_needed} onChange={e => setFormData({ ...formData, service_needed: e.target.value })} style={{ appearance: 'none', cursor: 'pointer' }}>
                    <option value="" disabled>Select service</option>
                    <option value="Starter Website">Starter Website</option>
                    <option value="Business Website">Business Website</option>
                    <option value="AI Automation">AI Automation</option>
                    <option value="Other">Other</option>
                  </select>
                  <ChevronDown size={20} className="select-icon" />
                </div>
                
                <div className="select-wrapper">
                  <label className="label-ultra">Budget Range</label>
                  <select required className="input-ultra" name="budget_range" value={formData.budget_range} onChange={e => setFormData({ ...formData, budget_range: e.target.value })} style={{ appearance: 'none', cursor: 'pointer' }}>
                    <option value="" disabled>Select budget</option>
                    <option value="8k-15k">₹8,000 – ₹15,000</option>
                    <option value="15k-30k">₹15,000 – ₹30,000</option>
                    <option value="custom">Custom Pricing</option>
                  </select>
                  <ChevronDown size={20} className="select-icon" />
                </div>
              </div>
              
              <div>
                <label className="label-ultra">Project details</label>
                <textarea required className="input-ultra" name="message" value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} placeholder="What are you looking to build?" rows="6" style={{ resize: 'none', borderRadius: '32px' }} />
              </div>
              
              {status === 'error' && (
                <motion.p className="text-red-600 font-semibold text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {errorMsg || 'Something went wrong. Please try again.'}
                </motion.p>
              )}
              
              <div className="mt-8">
                <button disabled={status === 'loading'} type="submit" className="btn-ultra-lg">
                  {status === 'loading' ? 'Sending...' : 'Send message'}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;
