import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

function ProfilePage() {
  const { user, refreshProfile } = useAuth();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    refreshProfile().then((data) => setStats(data?.stats || null));
  }, []);

  return (
    <div className="page split-section">
      <section className="glass-card">
        <span className="eyebrow">Profile</span>
        <h1>{user?.fullName}</h1>
        <div className="detail-grid">
          <div><span>Email</span><strong>{user?.email}</strong></div>
          <div><span>Role</span><strong>{user?.role}</strong></div>
          <div><span>Organization</span><strong>{user?.organization || "Individual User"}</strong></div>
        </div>
      </section>
      <section className="glass-card">
        <span className="eyebrow">Account Snapshot</span>
        <h2>Activity Summary</h2>
        <div className="detail-grid">
          <div><span>Assessments</span><strong>{stats?.assessments ?? "-"}</strong></div>
          <div><span>Appointments</span><strong>{stats?.appointments ?? "-"}</strong></div>
        </div>
      </section>
    </div>
  );
}

export default ProfilePage;
