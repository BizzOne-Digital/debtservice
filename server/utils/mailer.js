const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

const sendNotification = async ({ subject, html }) => {
  try {
    await transporter.sendMail({
      from: `"Debt Service Website" <${process.env.GMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject,
      html,
    });
  } catch (err) {
    console.error('Email send error:', err.message);
  }
};

const leadNotification = (lead) => sendNotification({
  subject: `🔔 New Lead: ${lead.name}`,
  html: `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f8f8f8;padding:20px;border-radius:8px;">
      <div style="background:#0a1628;padding:20px;border-radius:6px 6px 0 0;text-align:center;">
        <h1 style="color:#fff;margin:0;font-size:22px;">DEBT SERVICE</h1>
        <p style="color:#c0392b;margin:5px 0 0;font-size:13px;">New Lead Received</p>
      </div>
      <div style="background:#fff;padding:24px;border-radius:0 0 6px 6px;">
        <h2 style="color:#0a1628;margin:0 0 16px;">New Lead from Website</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px;color:#666;width:120px;">Name:</td><td style="padding:8px;font-weight:bold;">${lead.name}</td></tr>
          <tr style="background:#f9f9f9;"><td style="padding:8px;color:#666;">Phone:</td><td style="padding:8px;font-weight:bold;">${lead.phone}</td></tr>
          <tr><td style="padding:8px;color:#666;">Email:</td><td style="padding:8px;font-weight:bold;">${lead.email}</td></tr>
          <tr style="background:#f9f9f9;"><td style="padding:8px;color:#666;">Debt Amount:</td><td style="padding:8px;font-weight:bold;">${lead.debtAmount || 'Not specified'}</td></tr>
          <tr><td style="padding:8px;color:#666;">Message:</td><td style="padding:8px;">${lead.message}</td></tr>
          <tr style="background:#f9f9f9;"><td style="padding:8px;color:#666;">Time:</td><td style="padding:8px;">${new Date().toLocaleString()}</td></tr>
        </table>
        <div style="margin-top:20px;padding:12px;background:#0a1628;border-radius:6px;text-align:center;">
          <p style="color:#fff;margin:0;font-size:13px;">Login to Admin Panel to view all leads</p>
        </div>
      </div>
    </div>
  `,
});

const contactNotification = (contact) => sendNotification({
  subject: `📩 New Contact Message: ${contact.name}`,
  html: `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f8f8f8;padding:20px;border-radius:8px;">
      <div style="background:#0a1628;padding:20px;border-radius:6px 6px 0 0;text-align:center;">
        <h1 style="color:#fff;margin:0;font-size:22px;">DEBT SERVICE</h1>
        <p style="color:#c0392b;margin:5px 0 0;font-size:13px;">New Contact Message</p>
      </div>
      <div style="background:#fff;padding:24px;border-radius:0 0 6px 6px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px;color:#666;width:120px;">Name:</td><td style="padding:8px;font-weight:bold;">${contact.name}</td></tr>
          <tr style="background:#f9f9f9;"><td style="padding:8px;color:#666;">Email:</td><td style="padding:8px;">${contact.email}</td></tr>
          <tr><td style="padding:8px;color:#666;">Phone:</td><td style="padding:8px;">${contact.phone}</td></tr>
          <tr style="background:#f9f9f9;"><td style="padding:8px;color:#666;">Message:</td><td style="padding:8px;">${contact.message}</td></tr>
        </table>
      </div>
    </div>
  `,
});

module.exports = { leadNotification, contactNotification };
