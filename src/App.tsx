/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

import "./css/fonts.css";
import "./css/App.css";
import "./css/Mobile.css";

import mobileMessages from "./js/mobileMessages.json";
import errorMessages from "./js/errorPasswordMsg.json";

import InfoDB from "./InfoDB";
import Program from "./pages/infodb/program";
import Logic from "./pages/infodb/logic";
import CreateDocumentation from "./pages/CreateDocumentation";
import Documentation from "./pages/Documentation";

// 🔹 Moved the logic into a component so we can use useNavigate
function AppContent() {
  const navigate = useNavigate();

  const isMobile = window.innerWidth < 768;
  const mobileMessage = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * mobileMessages.length);
    return mobileMessages[randomIndex];
  }, []);

  const getRandomErrorMessage = () => {
    const messages = errorMessages.messages;
    const index = Math.floor(Math.random() * messages.length);
    const selected = messages[index];
    return `${selected.character}: ${selected.message}`;
  };

  if (isMobile) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000",
          color: "red",
          textAlign: "center",
          fontSize: "1.2rem",
          padding: "1rem",
        }}
      >
        {mobileMessage}
      </div>
    );
  }

  const [unlocked, setUnlocked] = useState(false);
  const [input, setInput] = useState("");
  const [accessGranted, setAccessGranted] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isWrong, setIsWrong] = useState(false);

  useEffect(() => {
    document.title = unlocked
      ? "Information Database"
      : "Visitor Authentication";
  }, [unlocked]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setError("");
    setIsWrong(false);
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (!input.trim()) return;

      setLoading(true);
      try {
        const res = await fetch("/api/verify-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: input }),
        });

        const data = await res.json();

        if (data.success) {
          setError("");
          setIsWrong(false);
          setAccessGranted(true);

          setTimeout(() => setFadeOut(true), 2800);
          setTimeout(() => {
            setUnlocked(true);
            navigate(data.route); // ✅ React Router navigation instead of reload
          }, 3100);
        } else {
          setError(getRandomErrorMessage());
          setInput("");
          setIsWrong(true);
        }
      } catch {
        setError("Server unreachable. Try again later.");
        setIsWrong(true);
      } finally {
        setLoading(false);
      }
    }
  };

  if (accessGranted && !unlocked) {
    return (
      <div
        className={`lock-screen access-granted ${
          fadeOut ? "fade-out" : "fade-in"
        }`}
      >
        <h1 className="accessGrantedText">ACCESS GRANTED</h1>
      </div>
    );
  }

  if (!unlocked) {
    return (
      <div className="lock-screen">
        <div className="lock-form">
          <h1 className="glitch">ANDREW</h1>
          <input
            type="password"
            value={input}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Authentication"
            className={`retro-input ${isWrong ? "wrong" : ""}`}
            autoFocus
            disabled={loading}
          />
          {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
          {loading && (
            <p style={{ color: "#0f0", marginTop: "0.5rem" }}>Verifying...</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<InfoDB />} />
      <Route path="/infodb/program" element={<Program />} />
      <Route path="/infodb/logic" element={<Logic />} />
      <Route path="/create-documentation" element={<CreateDocumentation />} />
      <Route path="/documentation" element={<Documentation />} />
    </Routes>
  );
}

// 🔹 Wrap AppContent in Router so useNavigate works
export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
