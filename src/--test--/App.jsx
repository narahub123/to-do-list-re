import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import "./App.css";

import Monthly from "./pages/Monthly";
import Weekly from "./pages/Weekly";
import Daily from "./pages/Daily";
import Login from "./pages/Login";

function App() {
  return (
    <main className="App">
      <BrowserRouter>
        <Sidebar>
          <Routes>
            <Route path="/" element={<Monthly />} />
            <Route path="/monthly" element={<Monthly />} />
            <Route path="/weekly" element={<Weekly />} />
            <Route path="/daily" element={<Daily />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Sidebar>
      </BrowserRouter>
    </main>
  );
}

export default App;
