import React, { useState } from "react";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import CategoryContent from "./Components/CategoryContent";
import TicTacToe from "./Components/Games/TicTacToe";
import NumberGuessingGame from "./Components/Games/NumberGuessingGame";
import MemoryCardGame from "./Components/Games/MemoryCardGame";
import ReactionGame from "./Components/Games/ReactionGame";

const MainLayout = () => {
  const [selectedCategory, setSelectedCategory] = useState("Action");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate(); // ✅ This is now safe to use

  return (
    <div className="app-container">
      <button
        className="mobile-menu-button"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? "✕" : "☰"}
      </button>

      <Dashboard
        onSelectCategory={setSelectedCategory}
        selected={selectedCategory}
        mobileMenuOpen={mobileMenuOpen}
        closeMobileMenu={() => setMobileMenuOpen(false)}
        showGame={() => navigate("/tic-tac-toe")} // ✅ Navigate to route
      />

      <CategoryContent
        category={selectedCategory}
        mobileMenuOpen={mobileMenuOpen}
        showGame={() => navigate("/tic-tac-toe")} // ✅ Navigate to route
      />
    </div>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />} />
      <Route path="/tic-tac-toe" element={<TicTacToe />} />
      <Route path="/NumberGuessingGame" element={<NumberGuessingGame/>}/>
      <Route path="/MemoryCardGame" element={<MemoryCardGame/>}/>
      <Route path="/ReactionGame" element={<ReactionGame/>}/>
    </Routes>
  );
};

export default App;
