import { useState } from "react";
import "./css/Background.css";
import Navigation from "./Navigation";
import LandingPage from "./pages/LandingContent";

export default function InfoDB() {
  const [activePage, setActivePage] = useState("Info DB");

  const renderPage = () => {
    switch (activePage) {
      case "Info DB":
        return <LandingPage />;
      case "Documentation":
        return <div className="page-content"> Documentation</div>;
      case "Philosophy":
        return <div className="page-content">Philosophy</div>;
      default:
        return <LandingPage />;
    }
  };
  
  return (
    <div className="wrapper">
      <div className="background-color-container-1">
        <div className="background-color-container-2">
          <div className="sub-wrapper">
            <div className="main-container">
              {/* Navigation passes page state */}
              <Navigation
                activePage={activePage}
                setActivePage={setActivePage}
              />
              {/* Render content below */}
              <div className="content-container">{renderPage()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
