import { useState } from "react";

const Dashboard = () => {
  const [user] = useState(() => {
    const savedUser = localStorage.getItem("codebridgeUser");
    const parsedUser = savedUser ? JSON.parse(savedUser) : null;

    return parsedUser || { full_name: "Student", email: "" };
  });

  return (
    <main className="dashboard-page">
      <section className="dashboard-card">
        <div className="dashboard-header">
          <div>
            <p className="dashboard-label">Welcome back</p>
            <h1>{user.full_name}</h1>
          </div>
          <span className="status-badge">Active</span>
        </div>

        <div className="profile-box">
          <p className="profile-title">Profile</p>
          <p>
            <strong>Name:</strong> {user.full_name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>

        <div className="dashboard-grid">
          <div className="metric-card">
            <span>Courses</span>
            <strong>0</strong>
          </div>
          <div className="metric-card">
            <span>Progress</span>
            <strong>0%</strong>
          </div>
          <div className="metric-card">
            <span>Next lesson</span>
            <strong>—</strong>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
