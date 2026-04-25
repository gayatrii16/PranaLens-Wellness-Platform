function InsightCard({ title, items, tone = "default" }) {
  return (
    <article className={`insight-card ${tone}`}>
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}

export default InsightCard;
