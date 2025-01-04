const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  guests: { type: Number, required: true },
  slot: { type: String, unique: true }, // Unique date+time slot
});

module.exports = mongoose.model("Booking", BookingSchema);
