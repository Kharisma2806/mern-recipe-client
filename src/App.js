import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/navbar";
import { Auth } from "./pages/saved-recipes"; // Importing Auth component from saved-recipes.js
import { CreateRecipe } from "./pages/create-recipe";
import { Home } from "./pages/home";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/saved-recipes" element={<Auth />} />{" "}
          {/* Rendering Auth component */}
          <Route path="/auth" element={<Auth />} />{" "}
          {/* Rendering Auth component */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
