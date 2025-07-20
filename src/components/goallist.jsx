// src/components/GoalList.jsx
import React, { useState } from "react";
import GoalCard from "./GoalCard";

export default function GoalList({ goals, onUpdateGoal, onDeleteGoal }) {
  const [sortBy, setSortBy] = useState("deadline");
  const [filterCategory, setFilterCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Get unique categories from goals
  const categories = [...new Set(goals.map(goal => goal.category))].sort();

  // Filter and sort goals
  const filteredGoals = goals.filter(goal => {
    const matchesCategory = filterCategory ? goal.category === filterCategory : true;
    const matchesSearch = searchTerm ? 
      goal.name.toLowerCase().includes(searchTerm.toLowerCase()) : true;
    return matchesCategory && matchesSearch;
  });

  const sortedGoals = [...filteredGoals].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "deadline":
        return new Date(a.deadline) - new Date(b.deadline);
      case "amount":
        return b.targetAmount - a.targetAmount;
      case "progress":
        return (b.savedAmount / b.targetAmount) - (a.savedAmount / a.targetAmount);
      default:
        return 0;
    }
  });

  return (
    <div>
      <h2>Your Goals</h2>
      
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search goals..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: 1 }}
        />
        
        <select 
          value={filterCategory} 
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        
        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="deadline">Sort by Deadline</option>
          <option value="name">Sort by Name</option>
          <option value="amount">Sort by Amount</option>
          <option value="progress">Sort by Progress</option>
        </select>
      </div>
      
      {sortedGoals.length > 0 ? (
        <div className="goal-list">
          {sortedGoals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onUpdateGoal={onUpdateGoal}
              onDeleteGoal={onDeleteGoal}
            />
          ))}
        </div>
      ) : (
        <p>No goals found. Add a new goal to get started!</p>
      )}
    </div>
  );
}
