require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});
app.use(express.json());

// Request logger
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Init Supabase (Conditional to prevent crash if not configured)
const supabaseUrl = process.env.SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';
const isSupabaseConfigured = supabaseUrl !== 'YOUR_SUPABASE_URL' && supabaseUrl.startsWith('http');
const supabase = isSupabaseConfigured ? createClient(supabaseUrl, supabaseKey) : null;

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_PORT == 465, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Verify connection configuration (Optional: only logs on cold start)
if (!process.env.VERCEL) {
  transporter.verify(function (error, success) {
    if (error) {
      console.error('SMTP Connection Error:', error.message);
    } else {
      console.log('SMTP Server is ready to take our messages');
    }
  });
}

// Email dispatch helper
const sendEmail = async (subject, html) => {
  if (!process.env.SMTP_USER || process.env.SMTP_PASS === 'YOUR_GMAIL_APP_PASSWORD') {
    console.log('[Email Mock] No SMTP credentials. Email not sent.');
    console.log(`[Subject]: ${subject}`);
    return;
  }

  try {
    await transporter.sendMail({
      from: `"Webora S2dio" <${process.env.SMTP_USER}>`,
      to: process.env.RECIPIENT_EMAIL,
      subject,
      html,
    });
    console.log(`Email sent: ${subject}`);
  } catch (error) {
    console.error('Email sending failed:', error.message);
  }
};

// SheetDB storage helper
const storeLeadInSheetDB = async (data) => {
  const sheetdbUrl = process.env.SHEETDB_API_URL;
  if (!sheetdbUrl || sheetdbUrl === 'YOUR_SHEETDB_API_URL') {
    console.log('[SheetDB Mock] No API URL. Lead not stored.');
    console.log('[Lead Data]:', data);
    return;
  }

  try {
    const response = await fetch(sheetdbUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: [
          {
            name: data.name,
            business_name: data.business_name,
            email: data.email,
            number: data.phone || '', // Mapped from phone to 'number' in Sheet
            services: data.service_needed, // Mapped to 'services' in Sheet
            budget: data.budget_range,
            message: data.message,
            date: new Date().toLocaleString() // More readable for Sheets
          }
        ]
      })
    });
    const result = await response.json();
    console.log('SheetDB Submission Result:', result);
  } catch (error) {
    console.error('SheetDB storage failed:', error.message);
  }
};

// Contact Setup Route
app.post('/api/contact', async (req, res) => {
  const { name, business_name, email, phone, service_needed, budget_range, message } = req.body;
  
  try {
    // Attempt parallel storage (Email first as it's priority)
    await sendEmail(
      `New Contact Inquiry: ${name}`,
      `
      <div style="font-family: sans-serif; line-height: 1.5; color: #333;">
        <h2>New Contact Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Business:</strong> ${business_name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Service:</strong> ${service_needed}</p>
        <p><strong>Budget:</strong> ${budget_range}</p>
        <hr/>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      </div>
      `
    );

    // Save to SheetDB independently
    // Now awaiting to ensure it runs and we capture logs in this step
    await storeLeadInSheetDB({ name, business_name, email, phone, service_needed, budget_range, message });

    // Continue with existing Supabase logic if configured
    if (!isSupabaseConfigured) {
      return res.status(200).json({ success: true, message: 'Message received (Email Sent & SheetDB Triggered)' });
    }

    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([
        { name, business_name, email, phone, service_needed, budget_range, message }
      ]);
      
    if (error) throw error;
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Submission processing error:', error.message);
    res.status(500).json({ success: false, error: 'Server error during submission' });
  }
});

// Standalone route mapping (for Vercel functions that might strip prefixes)
app.post('/contact', (req, res) => app.handle(req, res)); // Backup for different routing styles
app.post('/api/request-project', async (req, res) => {
  const { service, budget_range, timeline, name, email, phone } = req.body;
  
  // Automate Email Notification (Happens regardless of DB status)
  await sendEmail(
    `New Project Request: ${name}`,
    `
    <div style="font-family: sans-serif; line-height: 1.5; color: #333;">
      <h2>New Project Request</h2>
      <p><strong>Client Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
      <hr/>
      <p><strong>Service Requested:</strong> ${service}</p>
      <p><strong>Budget Range:</strong> ${budget_range}</p>
      <p><strong>Target Timeline:</strong> ${timeline}</p>
    </div>
    `
  );

  if (!isSupabaseConfigured) {
    console.log('[Dev Mode] Mocking project request insertion:', req.body);
    return res.status(200).json({ success: true, message: 'Project request received (Email Sent)' });
  }

  try {
    const { data, error } = await supabase
      .from('project_requests')
      .insert([
        { service, budget_range, timeline, name, email, phone }
      ]);
      
    if (error) throw error;
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Error saving project request:', error.message);
    res.status(500).json({ success: false, error: 'Database error' });
  }
});

// Start server
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    console.log(`Supabase Connection: ${supabaseUrl === 'YOUR_SUPABASE_URL' ? 'MOCK MODE' : 'ACTIVE'}`);
  });
}

module.exports = app;
