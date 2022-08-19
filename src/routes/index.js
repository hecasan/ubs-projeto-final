import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/Home";

export default function index() {
  return (
    <div className="App">
      <h1>Welcome to React Router!</h1>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="about" element={<About />} />
            <Route path="about" element={<About />} /> */}
      </Routes>
    </div>
  );
}
