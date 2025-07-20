// src/components/Overview.jsx
import React from "react";

export default function Overview({ goals }) {
  const totalGoals = goals.length;
  const totalSaved = goals.reduce((sum, g) => sum + g.savedAmount, 0);
  const totalTarget = goals.reduce((sum, g) => sum + g.targetAmount, 0);
  const goalsCompleted = goals.filter(
    (g) => g.savedAmount >= g.targetAmount
  ).length;
  
  const overdueGoals = goals.filter(
    (g) => {
      const daysLeft = Math.ceil(
        (new Date(g.deadline) - new Date()) / (1000 * 60 * 60 * 24)
      );
      return daysLeft < 0 && g.savedAmount < g.targetAmount;
    }
  ).length;
  
  const warningGoals = goals.filter(
    (g) => {
      const daysLeft = Math.ceil(
        (new Date(g.deadline) - new Date()) / (1000 * 60 * 60 * 24)
      );
      return daysLeft >= 0 && daysLeft < 30 && g.savedAmount < g.targetAmount;
    }
  ).length;

  // Sort goals by deadline (closest first)
  const sortedGoals = [...goals].sort((a, b) => 
    new Date(a.deadline) - new Date(b.deadline)
  );

  return (
    <div className="overview">
      <h2>Overview</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        <div>
          <h3>Summary</h3>
          <p>Total Goals: {totalGoals}</p>
          <p>Total Saved: ${totalSaved.toLocaleString()}</p>
          <p>Total Target: ${totalTarget.toLocaleString()}</p>
          <p>Goals Completed: {goalsCompleted}</p>
          {overdueGoals > 0 && (
            <p className="overdue">Overdue Goals: {overdueGoals}</p>
          )}
          {warningGoals > 0 && (
            <p className="warning">Goals Due Soon: {warningGoals}</p>
          )}
        </div>
        
        <div>
          <h3>Upcoming Deadlines</h3>
          {sortedGoals.length > 0 ? (
            <ul style={{ padding: 0, listStyle: "none" }}>
              {sortedGoals.slice(0, 5).map((g) => {
                const daysLeft = Math.ceil(
                  (new Date(g.deadline) - new Date()) / (1000 * 60 * 60 * 24)
                );
                const isCompleted = g.savedAmount >= g.targetAmount;
                
                return (
                  <li key={g.id} style={{ marginBottom: "5px" }}>
                    <strong>{g.name}:</strong> {daysLeft > 0 ? `${daysLeft} days left` : "Past due"}
                    {daysLeft < 30 && !isCompleted && daysLeft >= 0 && (
                      <span className="warning"> ⚠️</span>
                    )}
                    {daysLeft < 0 && !isCompleted && (
                      <span className="overdue"> ❌</span>
                    )}
                    {isCompleted && (
                      <span className="completed"> ✓</span>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>No goals yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
