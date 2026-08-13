import nodemailer from 'nodemailer';

class EmailService {
  constructor() {
    this.transporter = null;
  }

  getTransporter() {
    if (this.transporter) return this.transporter;

    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    return this.transporter;
  }

  isConfigured() {
    return Boolean(process.env.SMTP_PASS && process.env.SMTP_USER);
  }

  async sendEmail(to, subject, html) {
    if (!this.isConfigured()) {
      console.log(`[DEV EMAIL] To: ${to}, Subject: ${subject}`);
      console.log(`[DEV EMAIL] Content: ${html}`);
      return true;
    }

    try {
      await this.getTransporter().sendMail({
        from: process.env.EMAIL_FROM || process.env.SMTP_USER,
        to,
        subject,
        html,
      });
      return true;
    } catch (error) {
      console.error('[EMAIL ERROR]', error.message);
      throw error;
    }
  }

  async sendOtp(to, otp) {
    const subject = 'Your Password Reset OTP';
    const html = `
      <h1>Password Reset</h1>
      <p>Use the OTP below to reset your password:</p>
      <h2 style="letter-spacing: 4px; color: #2563eb;">${otp}</h2>
      <p>This code is valid for 10 minutes.</p>
    `;
    return this.sendEmail(to, subject, html);
  }

  async sendBookingConfirmation(userEmail, booking, event, ticket) {
    const subject = `Booking Confirmed - ${event.title}`;
    const html = `
      <h1>Booking Confirmed!</h1>
      <p>Your booking for <strong>${event.title}</strong> is confirmed.</p>
      <p>Booking ID: ${booking.bookingId}</p>
      <p>Ticket Code: ${ticket.ticketCode}</p>
      <p>Quantity: ${booking.quantity}</p>
      <p>Amount: $${booking.amount}</p>
      <p>Date: ${event.date}</p>
      <p>Venue: ${event.venue}</p>
    `;
    return this.sendEmail(userEmail, subject, html);
  }
}

export default new EmailService();
