import Sidebar from "./components/Sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Monthly from "./pages/Monthly";
import Weekly from "./pages/Weekly";
import Daily from "./pages/Daily";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Monthly />} />
        <Route path="/monthly" element={<Monthly />} />
        <Route path="/weekly" element={<Weekly />} />
        <Route path="/daily" element={<Daily />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
