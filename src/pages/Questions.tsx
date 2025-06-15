import React, { useState } from "react";
import "../css/Questions.css";
import {
  LandingPage,
  AboutYourself,
  ProfilePage,
  SettingsPage,
} from "./Answers";

const pageMap: Record<string, React.ReactNode> = {
  landing: <LandingPage />,
  aboutyourself: <AboutYourself />,
  profile: <ProfilePage />,
  settings: <SettingsPage />,
};

export default function Questions() {
  const [page, setPage] = useState("landing");

  return (
    <div className="questions-container">
      <nav className="questions-nav">
        <button onClick={() => setPage("aboutyourself")}>
          Tell me something about yourself
        </button>
        <button onClick={() => setPage("profile")}>Profile</button>
        <button onClick={() => setPage("settings")}>Settings</button>
      </nav>

      <div className="questions-content">
        {pageMap[page] ?? <p>Page not found.</p>}
      </div>
    </div>
  );
}
