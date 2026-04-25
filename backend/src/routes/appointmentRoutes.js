import express from "express";
import { nanoid } from "nanoid";
import { requireAuth } from "../middleware/authMiddleware.js";
import { readCollection, writeCollection } from "../services/dbService.js";

const router = express.Router();

router.post("/", requireAuth, async (req, res, next) => {
  try {
    const { assessmentType, preferredDate, preferredTime, notes } = req.body;
    const appointments = await readCollection("appointments.json");

    const appointment = {
      id: nanoid(),
      userId: req.user.id,
      fullName: req.user.fullName,
      email: req.user.email,
      assessmentType,
      preferredDate,
      preferredTime,
      notes,
      status: "Pending Confirmation",
      createdAt: new Date().toISOString()
    };

    appointments.push(appointment);
    await writeCollection("appointments.json", appointments);

    res.status(201).json(appointment);
  } catch (error) {
    next(error);
  }
});

router.get("/", requireAuth, async (req, res, next) => {
  try {
    const appointments = await readCollection("appointments.json");
    const userAppointments = appointments
      .filter((item) => item.userId === req.user.id)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json(userAppointments);
  } catch (error) {
    next(error);
  }
});

export default router;
