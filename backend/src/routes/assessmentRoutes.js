import express from "express";
import { nanoid } from "nanoid";
import { requireAuth } from "../middleware/authMiddleware.js";
import { readCollection, writeCollection } from "../services/dbService.js";
import { calculateAssessmentOutcome } from "../utils/recommendations.js";

const router = express.Router();

router.get("/questions", (_req, res) => {
  res.json([
    { id: "sleep-quality", category: "Recovery", dosha: "vata", prompt: "How restorative has your sleep felt over the last 7 days?" },
    { id: "stress-load", category: "Stress", dosha: "pitta", prompt: "How manageable has your daily stress felt during work or study?" },
    { id: "digestion", category: "Nutrition", dosha: "pitta", prompt: "How comfortable and regular has your digestion felt recently?" },
    { id: "focus", category: "Mental Clarity", dosha: "vata", prompt: "How easy has it been to sustain focus without mental fatigue?" },
    { id: "movement", category: "Physical Vitality", dosha: "kapha", prompt: "How energized does your body feel during movement and daily tasks?" },
    { id: "emotional-balance", category: "Emotional Wellness", dosha: "vata", prompt: "How emotionally steady and calm have you felt through the day?" },
    { id: "screen-overload", category: "Lifestyle", dosha: "kapha", prompt: "How well are you managing screen fatigue and sedentary time?" },
    { id: "resilience", category: "Resilience", dosha: "kapha", prompt: "How quickly do you bounce back after a demanding day?" }
  ]);
});

router.post("/", requireAuth, async (req, res, next) => {
  try {
    const { answers } = req.body;
    const assessments = await readCollection("assessments.json");
    const outcome = calculateAssessmentOutcome(answers);

    const assessment = {
      id: nanoid(),
      userId: req.user.id,
      createdAt: new Date().toISOString(),
      answers,
      ...outcome
    };

    assessments.push(assessment);
    await writeCollection("assessments.json", assessments);

    res.status(201).json(assessment);
  } catch (error) {
    next(error);
  }
});

router.get("/history", requireAuth, async (req, res, next) => {
  try {
    const assessments = await readCollection("assessments.json");
    const history = assessments
      .filter((item) => item.userId === req.user.id)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json(history);
  } catch (error) {
    next(error);
  }
});

export default router;
