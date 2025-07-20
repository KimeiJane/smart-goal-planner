// src/components/DepositForm.jsx
import React, { useState } from "react";

export default function DepositForm({ goal, onUpdateGoal }) {
  const [amount, setAmount] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const remaining = goal.targetAmount - goal.savedAmount;

  function handleDeposit(e) {
    e.preventDefault();
    const depositAmount = Number(amount);
    if (depositAmount <= 0) {
      alert("Please enter a positive amount");
      return;
    }
    
    const newAmount = goal.savedAmount + depositAmount;
    onUpdateGoal(goal.id, { savedAmount: newAmount });
    setAmount("");
    
    // Show success message
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  }

  return (
    <div>
      <h4>Make a Deposit</h4>
      <form onSubmit={handleDeposit}>
        <input
          type="number"
          placeholder="Deposit Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="1"
          max={remaining}
          required
        />
        <button type="submit">Deposit</button>
      </form>
      {showSuccess && (
        <p style={{ color: "green" }}>Deposit successful!</p>
      )}
    </div>
  );
}
