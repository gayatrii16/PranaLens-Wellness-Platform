function ScoreRing({ score = 0, label = "Wellness Index" }) {
  const angle = Math.round((score / 100) * 360);
  return (
    <div
      className="score-ring"
      style={{
        background: `conic-gradient(var(--teal) 0deg ${angle}deg, rgba(255,255,255,0.08) ${angle}deg 360deg)`
      }}
    >
      <div className="score-ring-inner">
        <strong>{score}</strong>
        <span>{label}</span>
      </div>
    </div>
  );
}

export default ScoreRing;
