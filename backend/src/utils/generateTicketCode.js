const generateTicketCode = async (Booking) => {
  const count = await Booking.countDocuments();
  const nextNumber = String(count + 1).padStart(6, '0');
  return `EVT-${nextNumber}`;
};

module.exports = generateTicketCode;
