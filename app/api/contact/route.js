// file: app/api/contact/route.js
import nodemailer from "nodemailer";

// Simple in-memory rate limiting
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 3;

function checkRateLimit(ip) {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW;
  
  const requests = rateLimitMap.get(ip) || [];
  const recentRequests = requests.filter(time => time > windowStart);
  
  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }
  
  recentRequests.push(now);
  rateLimitMap.set(ip, recentRequests);
  return true;
}

function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  return input
    .trim()
    .replace(/[<>]/g, '')
    .substring(0, 1000);
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

function validateName(name) {
  return name && name.length >= 2 && name.length <= 100;
}

function validateMessage(message) {
  return message && message.length >= 10 && message.length <= 2000;
}

export async function POST(req) {
  const forwarded = req.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : 'unknown';

  if (!checkRateLimit(ip)) {
    return new Response(
      JSON.stringify({ 
        error: "Too many requests. Please try again in a minute." 
      }), 
      { status: 429, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const data = await req.json();
    
    const name = sanitizeInput(data.name);
    const email = sanitizeInput(data.email).toLowerCase();
    const message = sanitizeInput(data.message);

    // Validation
    if (!validateName(name)) {
      return new Response(
        JSON.stringify({ error: "Please provide a valid name (2-100 characters)." }), 
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!validateEmail(email)) {
      return new Response(
        JSON.stringify({ error: "Please provide a valid email address." }), 
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!validateMessage(message)) {
      return new Response(
        JSON.stringify({ error: "Please provide a message between 10 and 2000 characters." }), 
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get environment variables with fallbacks for Gmail
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;
    
    if (!user || !pass) {
      console.error("Email credentials missing:", {
        hasUser: !!user,
        hasPass: !!pass,
        user: user ? `${user.slice(0, 3)}...` : 'undefined'
      });
      
      return new Response(
        JSON.stringify({
          error: "Email service is currently unavailable. Please try again later or contact me directly at sifatabir2001@gmail.com"
        }), 
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Gmail-specific configuration
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: user,
        pass: pass,
      },
      tls: {
        rejectUnauthorized: false // For local development
      }
    });

    // Verify connection
    try {
      await transporter.verify();
      console.log('SMTP connection verified successfully');
    } catch (verifyError) {
      console.error('SMTP verification failed:', verifyError.message);
      return new Response(
        JSON.stringify({
          error: `Email service configuration error: ${verifyError.message}`
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const emailContent = {
      from: {
        name: "Portfolio Contact Form",
        address: user
      },
      to: user, // Send to yourself
      replyTo: email, // So you can reply directly to the sender
      subject: `🎯 New Portfolio Message from ${name}`,
      text: `
New Message from Portfolio Contact Form:

Name: ${name}
Email: ${email}
IP: ${ip}
Time: ${new Date().toISOString()}

Message:
${message}

---
This message was sent from your portfolio website contact form.
      `,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #f8f9fa; padding: 20px; border-radius: 10px; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #555; }
    .message { background: #f1f3f4; padding: 15px; border-radius: 5px; margin: 10px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>🎯 New Portfolio Message</h2>
      <p>From: ${name} (${email})</p>
    </div>
    <div class="field">
      <div class="label">Message:</div>
      <div class="message">${message.replace(/\n/g, '<br>')}</div>
    </div>
    <div class="field">
      <div class="label">Details:</div>
      <div>IP: ${ip}</div>
      <div>Time: ${new Date().toLocaleString()}</div>
    </div>
  </div>
</body>
</html>
      `,
    };

    // Send email
    await transporter.sendMail(emailContent);
    console.log(`Contact form submitted successfully from ${email}`);

    return new Response(
      JSON.stringify({ 
        success: true,
        message: "Message sent successfully! I'll get back to you soon." 
      }), 
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error("Contact form error:", error);
    
    let errorMessage = "Failed to send message. Please try again or contact me directly at sifatabir2001@gmail.com";
    
    if (error.code === 'EAUTH') {
      errorMessage = "Email authentication failed. Please check email configuration.";
    } else if (error.code === 'ECONNECTION') {
      errorMessage = "Cannot connect to email service. Please try again later.";
    }

    return new Response(
      JSON.stringify({ 
        success: false,
        error: errorMessage 
      }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
