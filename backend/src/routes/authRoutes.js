import express from "express";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import { readCollection, writeCollection } from "../services/dbService.js";
import { requireAuth, signToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", async (req, res, next) => {
  try {
    const { fullName, email, password, role, organization } = req.body;
    const users = await readCollection("users.json");

    if (users.some((user) => user.email.toLowerCase() === email.toLowerCase())) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = {
      id: nanoid(),
      fullName,
      email,
      passwordHash,
      role,
      organization,
      createdAt: new Date().toISOString()
    };

    users.push(user);
    await writeCollection("users.json", users);

    const token = signToken(user.id);

    res.status(201).json({
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        organization: user.organization
      }
    });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const users = await readCollection("users.json");
    const user = users.find((entry) => entry.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const passwordMatches = user.demoPassword
      ? password === user.demoPassword
      : await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatches) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = signToken(user.id);

    res.json({
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        organization: user.organization
      }
    });
  } catch (error) {
    next(error);
  }
});

router.get("/me", requireAuth, async (req, res) => {
  const assessments = await readCollection("assessments.json");
  const appointments = await readCollection("appointments.json");

  res.json({
    user: {
      id: req.user.id,
      fullName: req.user.fullName,
      email: req.user.email,
      role: req.user.role,
      organization: req.user.organization
    },
    stats: {
      assessments: assessments.filter((item) => item.userId === req.user.id).length,
      appointments: appointments.filter((item) => item.userId === req.user.id).length
    }
  });
});

export default router;
