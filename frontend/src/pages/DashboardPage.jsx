import { useEffect, useState } from "react";
import { ArcElement, CategoryScale, Chart as ChartJS, Legend, LineElement, LinearScale, PointElement, Tooltip } from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import ScoreRing from "../components/ScoreRing";
import InsightCard from "../components/InsightCard";
import { useAuth } from "../context/AuthContext";
import { apiRequest } from "../lib/api";

ChartJS.register(ArcElement, CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend);

function DashboardPage() {
  const { token, user } = useAuth();
  const [dashboard, setDashboard] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([apiRequest("/dashboard", { token }), apiRequest("/assessments/history", { token })])
      .then(([dashboardData, historyData]) => {
        setDashboard(dashboardData);
        setHistory(historyData);
      })
      .catch((err) => setError(err.message));
  }, [token]);

  if (error) return <div className="page glass-card">Unable to load dashboard: {error}</div>;
  if (!dashboard) return <div className="page glass-card">Loading your wellness dashboard...</div>;

  const latest = dashboard.latestAssessment;
  const trendData = {
    labels: dashboard.chartSeries.map((item) => item.date),
    datasets: [{
      label: "Wellness Score",
      data: dashboard.chartSeries.map((item) => item.score),
      borderColor: "#5eead4",
      backgroundColor: "rgba(94, 234, 212, 0.18)",
      tension: 0.4,
      fill: true
    }]
  };
  const categoryData = {
    labels: dashboard.categoryBreakdown.map((item) => item.category),
    datasets: [{
      data: dashboard.categoryBreakdown.map((item) => item.value),
      backgroundColor: ["#0f766e", "#38bdf8", "#8b5cf6", "#f59e0b", "#22c55e", "#14b8a6", "#ef4444", "#3b82f6"],
      borderWidth: 0
    }]
  };

  return (
    <div className="page dashboard-layout">
      <section className="glass-card dashboard-hero">
        <div>
          <span className="eyebrow">Dashboard</span>
          <h1>Welcome back, {user?.fullName?.split(" ")[0]}</h1>
          <p>Review your latest wellness signal, see how it is trending, and act on your personalized recommendations.</p>
        </div>
        <ScoreRing score={dashboard.quickStats.wellnessIndex} />
      </section>
      {latest ? (
        <>
          <section className="dashboard-grid">
            <article className="glass-card">
              <h3>Latest Assessment Summary</h3>
              <div className="summary-row">
                <div><span>Status</span><strong>{latest.status}</strong></div>
                <div><span>Dominant Dosha Lens</span><strong>{latest.dominantDosha}</strong></div>
                <div><span>Energy Insight</span><strong>{latest.energyInsight}</strong></div>
              </div>
            </article>
            <article className="glass-card chart-card">
              <h3>Wellness Trend</h3>
              <Line data={trendData} />
            </article>
            <article className="glass-card chart-card">
              <h3>Category Breakdown</h3>
              <Doughnut data={categoryData} />
            </article>
          </section>
          <section className="recommendation-grid">
            <InsightCard title="Lifestyle Suggestions" items={latest.recommendations.lifestyle} />
            <InsightCard title="Nutrition Tips" items={latest.recommendations.nutrition} tone="cool" />
            <InsightCard title="Mindfulness Practices" items={latest.recommendations.mindfulness} tone="warm" />
          </section>
          <section className="dashboard-grid">
            <article className="glass-card">
              <h3>Upcoming Appointments</h3>
              <div className="list-stack">
                {dashboard.appointments.length ? dashboard.appointments.map((item) => (
                  <div key={item.id} className="list-row">
                    <div>
                      <strong>{item.assessmentType}</strong>
                      <span>{item.preferredDate} at {item.preferredTime}</span>
                    </div>
                    <span className="pill">{item.status}</span>
                  </div>
                )) : <p>No appointments booked yet.</p>}
              </div>
            </article>
            <article className="glass-card">
              <h3>Assessment History</h3>
              <div className="list-stack">
                {history.map((item) => (
                  <div key={item.id} className="list-row">
                    <div>
                      <strong>{item.status}</strong>
                      <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                    </div>
                    <span className="pill">{item.score}/100</span>
                  </div>
                ))}
              </div>
            </article>
          </section>
        </>
      ) : (
        <section className="glass-card">
          <h3>No assessment completed yet</h3>
          <p>Take your first wellness assessment to unlock your dashboard and recommendations.</p>
        </section>
      )}
    </div>
  );
}

export default DashboardPage;
