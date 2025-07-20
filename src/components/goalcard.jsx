// src/components/GoalCard.jsx
import React, { useState } from "react";
import DepositForm from "./DepositForm";

export default function GoalCard({ goal, onUpdateGoal, onDeleteGoal }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedGoal, setEditedGoal] = useState({
    name: goal.name,
    targetAmount: goal.targetAmount,
    category: goal.category,
    deadline: goal.deadline
  });

  const remaining = goal.targetAmount - goal.savedAmount;
  const percentage = Math.min(
    (goal.savedAmount / goal.targetAmount) * 100,
    100
  ).toFixed(2);

  const categories = [
    "Travel", "Emergency", "Electronics", "Real Estate", 
    "Vehicle", "Education", "Shopping", "Home", "Retirement", "Other"
  ];

  // Calculate days left and status
  const daysLeft = Math.ceil(
    (new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24)
  );
  const isCompleted = goal.savedAmount >= goal.targetAmount;
  const isWarning = daysLeft < 30 && !isCompleted;
  const isOverdue = daysLeft < 0 && !isCompleted;

  function handleDelete() {
    if (window.confirm("Are you sure you want to delete this goal?")) {
      onDeleteGoal(goal.id);
    }
  }

  function handleEdit() {
    setIsEditing(true);
  }

  function handleSaveEdit() {
    onUpdateGoal(goal.id, {
      name: editedGoal.name,
      targetAmount: Number(editedGoal.targetAmount),
      category: editedGoal.category,
      deadline: editedGoal.deadline
    });
    setIsEditing(false);
  }

  function handleCancelEdit() {
    setEditedGoal({
      name: goal.name,
      targetAmount: goal.targetAmount,
      category: goal.category,
      deadline: goal.deadline
    });
    setIsEditing(false);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setEditedGoal({ ...editedGoal, [name]: value });
  }

  return (
    <div className="goal-card">
      {isEditing ? (
        <div>
          <h3>Edit Goal</h3>
          <input
            type="text"
            name="name"
            value={editedGoal.name}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="targetAmount"
            value={editedGoal.targetAmount}
            onChange={handleChange}
            min="1"
            required
          />
          <select
            name="category"
            value={editedGoal.category}
            onChange={handleChange}
            required
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <input
            type="date"
            name="deadline"
            value={editedGoal.deadline}
            onChange={handleChange}
            required
          />
          <div className="goal-actions">
            <button onClick={handleSaveEdit}>Save</button>
            <button onClick={handleCancelEdit}>Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <h3>{goal.name}</h3>
          <p>Category: {goal.category}</p>
          <p>Target: ${goal.targetAmount.toLocaleString()}</p>
          <p>Saved: ${goal.savedAmount.toLocaleString()}</p>
          <p>Remaining: ${remaining.toLocaleString()}</p>
          <p>
            Deadline: {goal.deadline}
            {isOverdue && <span className="overdue"> (OVERDUE!)</span>}
            {isWarning && !isOverdue && <span className="warning"> (Warning: Less than 30 days left!)</span>}
            {isCompleted && <span className="completed"> (COMPLETED!)</span>}
          </p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
          </div>
          <p>{percentage}% complete</p>
          <div className="goal-actions">
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
          <DepositForm goal={goal} onUpdateGoal={onUpdateGoal} />
        </>
      )}
    </div>
  );
}
