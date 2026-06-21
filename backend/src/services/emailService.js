class EmailService {
  async sendEmail(to, subject, html) {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[DEV EMAIL] To: ${to}, Subject: ${subject}`);
      return true;
    }
    // Integrate nodemailer or SendGrid here in production
    return true;
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

module.exports = new EmailService();
