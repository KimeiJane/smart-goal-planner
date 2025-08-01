// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./src/app.jsx";
import "./src/App.css"; 

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
