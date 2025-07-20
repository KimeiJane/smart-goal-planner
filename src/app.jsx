// src/App.jsx
import React, { useEffect, useState } from "react";
import { getGoals, addGoal, updateGoal, deleteGoal } from "./api";
import AddGoalForm from "./components/AddGoalForm";
import GoalList from "./components/GoalList";
import Overview from "./components/Overview";

export default function App() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    setLoading(true);
    getGoals()
      .then(data => {
        setGoals(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch goals:", err);
        setError("Failed to load goals. Please make sure json-server is running.");
        setLoading(false);
      });
  }, []);

  function handleAddGoal(newGoal) {
    addGoal(newGoal)
      .then((savedGoal) => {
        setGoals([...goals, savedGoal]);
        setShowAddForm(false);
      })
      .catch(err => {
        console.error("Failed to add goal:", err);
        alert("Failed to add goal. Please try again.");
      });
  }

  function handleUpdateGoal(id, updates) {
    updateGoal(id, updates)
      .then((updated) => {
        setGoals(goals.map((goal) => (goal.id === id ? updated : goal)));
      })
      .catch(err => {
        console.error("Failed to update goal:", err);
        alert("Failed to update goal. Please try again.");
      });
  }

  function handleDeleteGoal(id) {
    deleteGoal(id)
      .then(() => {
        setGoals(goals.filter((goal) => goal.id !== id));
      })
      .catch(err => {
        console.error("Failed to delete goal:", err);
        alert("Failed to delete goal. Please try again.");
      });
  }

  if (loading) {
    return (
      <div className="App">
        <h1>Smart Goal Planner</h1>
        <p>Loading goals...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="App">
        <h1>Smart Goal Planner</h1>
        <p style={{ color: "red" }}>{error}</p>
        <p>
          Make sure json-server is running with the command:
          <br />
          <code>npx json-server --watch src/db.json</code>
        </p>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Smart Goal Planner</h1>
      <p>Track your financial goals and savings progress</p>
      
      <Overview goals={goals} />
      
      {showAddForm ? (
        <>
          <AddGoalForm onAddGoal={handleAddGoal} />
          <button 
            onClick={() => setShowAddForm(false)}
            style={{ marginBottom: "20px" }}
          >
            Cancel
          </button>
        </>
      ) : (
        <button 
          onClick={() => setShowAddForm(true)}
          style={{ marginBottom: "20px" }}
        >
          + Add New Goal
        </button>
      )}
      
      <GoalList
        goals={goals}
        onUpdateGoal={handleUpdateGoal}
        onDeleteGoal={handleDeleteGoal}
      />
      
      <footer style={{ marginTop: "40px", textAlign: "center", color: "#666" }}>
        <p>SMART Goal Planner - Track your financial goals</p>
      </footer>
    </div>
  );
}
