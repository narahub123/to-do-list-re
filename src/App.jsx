import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import MonthlyDashboard from "./pages/Monthly/MonthlyDashboard";
import DailyDashboard from "./pages/Daily/DailyDashboard";
import WeeklyDashboard from "./pages/Weekly/WeeklyDashboard";
import Settings from "./pages/Settings/Settings";

const App = () => {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/" element={<MonthlyDashboard />} />
          <Route path="/monthly" element={<WeeklyDashboard />} />
          <Route path="/weekly" element={<DailyDashboard />} />
          <Route path="/daily" element={<DailyDashboard />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;
