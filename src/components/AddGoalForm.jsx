// src/components/AddGoalForm.jsx
import React, { useState } from "react";

export default function AddGoalForm({ onAddGoal }) {
  const [name, setName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [category, setCategory] = useState("");
  const [deadline, setDeadline] = useState("");

  const categories = [
    "Travel", "Emergency", "Electronics", "Real Estate", 
    "Vehicle", "Education", "Shopping", "Home", "Retirement", "Other"
  ];

  function handleSubmit(e) {
    e.preventDefault();
    const newGoal = {
      name,
      targetAmount: Number(targetAmount),
      savedAmount: 0,
      category,
      deadline,
      createdAt: new Date().toISOString().split("T")[0]
    };
    onAddGoal(newGoal);
    setName("");
    setTargetAmount("");
    setCategory("");
    setDeadline("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Goal</h2>
      <input
        type="text"
        placeholder="Goal Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Target Amount"
        value={targetAmount}
        onChange={(e) => setTargetAmount(e.target.value)}
        min="1"
        required
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="">Select Category</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        required
      />
      <button type="submit">Add Goal</button>
    </form>
  );
}