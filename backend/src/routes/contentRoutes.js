import express from "express";
import { readCollection } from "../services/dbService.js";

const router = express.Router();

router.get("/blog", async (_req, res, next) => {
  try {
    const blogPosts = await readCollection("blogPosts.json");
    res.json(blogPosts);
  } catch (error) {
    next(error);
  }
});

router.get("/company", (_req, res) => {
  res.json({
    brand: "PranaLens Wellness",
    tagline: "Human-centered energy intelligence for resilient lives and workplaces.",
    vision:
      "To make preventive, non-invasive wellness intelligence accessible to every student, team, and institution.",
    mission:
      "Blend AI insight with Ayurveda, acupressure, and guided lifestyle design to help people restore balance before burnout takes hold.",
    differentiators: [
      "Non-invasive, in-person wellness assessments powered by guided diagnostics",
      "AI-assisted interpretation layered with Ayurveda and energy-balancing frameworks",
      "Actionable reports for both individuals and organizations"
    ]
  });
});

export default router;
