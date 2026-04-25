const scoreBands = [
  {
    min: 85,
    label: "Thriving Balance",
    color: "#22c55e",
    lifestyle: [
      "Maintain your restorative sleep rhythm with consistent digital wind-down routines.",
      "Protect high-energy windows by batching deep work and recovery breaks.",
      "Continue moderate movement practices such as yoga flow, walking, or mobility circuits."
    ],
    nutrition: [
      "Favor anti-inflammatory meals built around greens, seasonal fruits, lentils, and healthy fats.",
      "Hydrate steadily throughout the day and include mineral-rich foods after intense workdays."
    ],
    mindfulness: [
      "Practice 10 minutes of pranayama or box breathing before demanding tasks.",
      "Use a short gratitude reflection at night to reinforce emotional stability."
    ]
  },
  {
    min: 65,
    label: "Adaptive Recovery",
    color: "#38bdf8",
    lifestyle: [
      "Introduce 5-minute recovery pauses every 90 minutes to reduce cognitive fatigue.",
      "Anchor your day with regular mealtimes and a fixed sleep window.",
      "Use acupressure-inspired self-massage on palms, neck, and soles to ease stress accumulation."
    ],
    nutrition: [
      "Reduce excess caffeine after 2 PM and increase warm, grounding meals.",
      "Support stable energy with balanced plates: protein, fiber, vegetables, and whole grains."
    ],
    mindfulness: [
      "Try guided body scans or alternate nostril breathing twice a day.",
      "Replace one doom-scrolling habit with a 15-minute restorative evening routine."
    ]
  },
  {
    min: 45,
    label: "Needs Rebalancing",
    color: "#f59e0b",
    lifestyle: [
      "Prioritize a lighter weekly schedule with deliberate recovery blocks and lower evening stimulation.",
      "Shift from intense exercise to gentle mobility, stretching, and short outdoor walks.",
      "Book a guided in-person wellness session to interpret your energy patterns more deeply."
    ],
    nutrition: [
      "Choose warm, easy-to-digest meals and avoid skipping breakfast.",
      "Track hydration and keep simple nourishing snacks available during busy hours."
    ],
    mindfulness: [
      "Practice 5 minutes of diaphragmatic breathing on waking and before sleep.",
      "Use journaling prompts to spot stress triggers and energy drains."
    ]
  },
  {
    min: 0,
    label: "Restore and Reset",
    color: "#ef4444",
    lifestyle: [
      "Reduce overload immediately and create a 7-day recovery plan focused on sleep, hydration, and gentle movement.",
      "Seek structured support through personalized assessment follow-up and lifestyle coaching.",
      "Avoid stacking social, work, and physical demands without decompression time."
    ],
    nutrition: [
      "Aim for consistent meals with soothing foods such as soups, khichdi-style bowls, fruit, and herbal beverages.",
      "Limit sugar spikes and highly processed convenience foods during the recovery phase."
    ],
    mindfulness: [
      "Begin with short guided breathing or mindfulness sessions under 5 minutes to rebuild consistency.",
      "Use sensory grounding techniques when stress symptoms intensify."
    ]
  }
];

const doshaHints = {
  vata: "Focus on warmth, routine, and grounding recovery rituals.",
  pitta: "Prioritize cooling practices, boundaries, and anti-inflammatory foods.",
  kapha: "Build momentum with energizing movement and lighter, stimulating meals."
};

export function calculateAssessmentOutcome(answers) {
  const total = answers.reduce((sum, answer) => sum + Number(answer.value || 0), 0);
  const maxScore = answers.length * 5;
  const score = Math.round((total / maxScore) * 100);

  const doshaMap = { vata: 0, pitta: 0, kapha: 0 };
  answers.forEach((answer) => {
    if (answer.dosha && doshaMap[answer.dosha] !== undefined) {
      doshaMap[answer.dosha] += Number(answer.value || 0);
    }
  });

  const dominantDosha = Object.entries(doshaMap).sort((a, b) => b[1] - a[1])[0][0];
  const band = scoreBands.find((entry) => score >= entry.min) || scoreBands[scoreBands.length - 1];

  return {
    score,
    status: band.label,
    color: band.color,
    dominantDosha,
    energyInsight: doshaHints[dominantDosha],
    recommendations: {
      lifestyle: band.lifestyle,
      nutrition: band.nutrition,
      mindfulness: band.mindfulness
    }
  };
}
