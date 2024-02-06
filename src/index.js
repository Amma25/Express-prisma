// server.js
const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Get all rooms
app.get('/rooms', async (req, res) => {
  const rooms = await prisma.room.findMany();
  res.json(rooms);
});

// Get room by ID
app.get('/rooms/:id', async (req, res) => {
  const roomId = parseInt(req.params.id);
  const room = await prisma.room.findUnique({
    where: { id: roomId },
    include: { bookings: true },
  });
  res.json(room);
});

// Create a new booking
app.post('/bookings', async (req, res) => {
  const { roomId, startDate, endDate, guestName, guestEmail } = req.body;
  const booking = await prisma.booking.create({
    data: {
      roomId,
      startDate,
      endDate,
      guestName,
      guestEmail,
    },
  });
  res.json(booking);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
