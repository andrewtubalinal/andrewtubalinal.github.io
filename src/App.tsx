/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./css/fonts.css";
import "./css/App.css";
import "./css/Mobile.css";
import mobileMessages from "./js/mobileMessages.json";
import { useMemo } from "react";

import InfoDB from "./InfoDB";
import Program from "./pages/infodb/program"; // Add more as needed
// import UIUX from "./pages/infodb/ui-ux";      // Example additional route
// import Automation from "./pages/infodb/automation"; // Optional
import Logic from "./pages/infodb/logic";

// Read the password from .env
const PASSWORD = import.meta.env.VITE_APP_PASSWORD ?? "";

export default function App() {
  const isMobile = window.innerWidth < 768;
  const mobileMessage = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * mobileMessages.length);
    return mobileMessages[randomIndex];
  }, []);
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
        fontFamily: "monospace"
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

  useEffect(() => {
    document.title = unlocked
      ? "Information Database"
      : "Visitor Authentication";
  }, [unlocked]);

  useEffect(() => {
    if (input === PASSWORD) {
      setAccessGranted(true);
      setTimeout(() => setFadeOut(true), 2800);
      setTimeout(() => setUnlocked(true), 3100);
    }
  }, [input]);

  const tryCloseTab = () => {
    window.open("", "_self");
    window.close();
    setTimeout(() => {
      if (!window.closed) window.location.href = "about:blank";
    }, 100);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    if (value.length >= PASSWORD.length && value !== PASSWORD) {
      alert("Incorrect password. This tab will close now.");
      tryCloseTab();
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
            placeholder="Authentication"
            className="retro-input"
            autoFocus
          />
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
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}
