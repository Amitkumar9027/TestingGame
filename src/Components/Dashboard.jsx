import React from "react";
import "./Dashboard.css";

const categories = ["Action", "Comedy", "Drama", "Horror", "Sci-Fi"];

const Dashboard = ({ onSelectCategory, selected, mobileMenuOpen, closeMobileMenu }) => {
  return (
    <div className={`dashboard ${mobileMenuOpen ? "mobile-open" : ""}`}>
      <h2>Game Categories</h2>
      <ul>
        {categories.map((cat) => (
          <li
            key={cat}
            className={selected === cat ? "active" : ""}
            onClick={() => {
              onSelectCategory(cat);
              closeMobileMenu();
            }}
          >
            {cat}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;