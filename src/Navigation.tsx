import React from "react";
import "./css/Navigation.css";

interface NavigationProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

export default function Navigation({ activePage, setActivePage }: NavigationProps) {
  const navItems = ["Info DB", "Documentation", "Philosophy"];
  
  return (
    <nav className="navigation-bar">
      <div className="nav-brand"></div>
      <ul className="nav-links">
        {navItems.map((item) => (
          <li key={item}>
            <div
              onClick={() => setActivePage(item)}
              className={activePage === item ? "active" : ""}
            >
              {item}
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
}
