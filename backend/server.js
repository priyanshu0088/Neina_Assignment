const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const Booking = require("./models/Booking");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once("open", () => console.log("Connected to MongoDB"));

// API Endpoints
app.post("/api/create-booking", async (req, res) => {
  const { name, contact, date, time, guests } = req.body;
  const slot = `${date} ${time}`;
  try {
    const booking = new Booking({ name, contact, date, time, guests, slot });
    await booking.save();
    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (err) {
    res.status(400).json({ message: "Slot already booked", error: err });
  }
});

app.get("/api/get-bookings", async (req, res) => {
  const { date } = req.query;
  try {
    const bookings = await Booking.find(date ? { date } : {});
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Error fetching bookings", error: err });
  }
});

app.delete("/api/delete-booking/:id", async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting booking", error: err });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
