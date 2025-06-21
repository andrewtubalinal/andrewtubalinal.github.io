/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./css/fonts.css";
import "./css/App.css";
import "./css/Mobile.css";

import mobileMessages from "./js/mobileMessages.json";
import errorMessages from "./js/errorPasswordMsg.json";

import InfoDB from "./InfoDB";
import Program from "./pages/infodb/program";
import Logic from "./pages/infodb/logic";
// import UIUX from "./pages/infodb/ui-ux";
// import Automation from "./pages/infodb/automation";

const PASSWORD = import.meta.env.VITE_APP_PASSWORD ?? "";

export default function App() {
  const isMobile = window.innerWidth < 768;
  const mobileMessage = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * mobileMessages.length);
    return mobileMessages[randomIndex];
  }, []);
  
  const getRandomErrorMessage = () => {
    const messages = errorMessages.message;
    const index = Math.floor(Math.random() * messages.length);
    return messages[index];
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

  useEffect(() => {
    document.title = unlocked
      ? "Information Database"
      : "Visitor Authentication";
  }, [unlocked]);

  useEffect(() => {
    if (input === PASSWORD) {
      setAccessGranted(true);
      setError(""); // Clear error if correct
      setTimeout(() => setFadeOut(true), 2800);
      setTimeout(() => setUnlocked(true), 3100);
    }
  }, [input]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setError(""); // Clear any previous error
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (input !== PASSWORD) {
        setError(getRandomErrorMessage());
        setInput(""); // Optionally clear the input
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
            className="retro-input"
            autoFocus
          />
          {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<InfoDB />} />
        <Route path="/infodb/program" element={<Program />} />
        <Route path="/infodb/logic" element={<Logic />} />
        {/* <Route path="/infodb/ui-ux" element={<UIUX />} />
        <Route path="/infodb/automation" element={<Automation />} /> */}
      </Routes>
    </Router>
  );
}
