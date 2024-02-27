import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MonthlyDashboard from "./pages/MonthlyDashboard";
import WeeklyDashboard from "./pages/WeeklyDashboard";
import DailyDashboard from "./pages/DailyDashboard";
import Settings from "./pages/Settings";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MonthlyDashboard />} />
        <Route path="/monthly" element={<MonthlyDashboard />} />
        <Route path="/weekly" element={<WeeklyDashboard />} />
        <Route path="/daily" element={<DailyDashboard />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
