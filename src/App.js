// src/App.js
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import LiveBoard from "./components/LiveBoard";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import './styles.css';

function App() {
  const navigate = useNavigate();

  // 🔹 Poslušamo spremembo prijave uporabnika
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/board"); // Če je prijavljen, ga preusmeri na board
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  return (
    <div>
<nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
  <div className="flex gap-6">
    <Link to="/" className="hover:text-green-400 font-semibold">HOME</Link>
    <Link to="/board" className="hover:text-yellow-400 font-semibold">BETTING</Link>
    <Link to="/history" className="hover:text-blue-400 font-semibold">HISTORY</Link>
  </div>
  <div className="flex items-center gap-2">
    <span className="material-icons">account_circle</span>
    <span className="font-semibold">USER</span>
  </div>
</nav>


      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/board" element={<LiveBoard />} />
      </Routes>
    </div>
  );
}

// ⚠️ Potrebno je oviti z <Router> višje (da deluje useNavigate)
export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
