import express from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import { readCollection } from "../services/dbService.js";

const router = express.Router();

router.get("/", requireAuth, async (req, res, next) => {
  try {
    const assessments = await readCollection("assessments.json");
    const appointments = await readCollection("appointments.json");
    const userAssessments = assessments
      .filter((item) => item.userId === req.user.id)
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    const latest = userAssessments[userAssessments.length - 1] || null;
    const chartSeries = userAssessments.map((item) => ({
      date: item.createdAt.slice(0, 10),
      score: item.score
    }));

    const categoryBreakdown = latest
      ? latest.answers.map((answer) => ({
          category: answer.category,
          value: Math.round((Number(answer.value) / 5) * 100)
        }))
      : [];

    res.json({
      latestAssessment: latest,
      chartSeries,
      categoryBreakdown,
      appointments: appointments.filter((item) => item.userId === req.user.id).slice(0, 3),
      quickStats: {
        completedAssessments: userAssessments.length,
        nextStep: latest ? "Book your follow-up interpretation session" : "Take your first assessment",
        wellnessIndex: latest ? latest.score : 0
      }
    });
  } catch (error) {
    next(error);
  }
});

export default router;
