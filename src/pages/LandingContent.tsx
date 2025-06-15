import React, { useState } from "react";
import categories from "../js/category.json";
import "../css/Pages.css";

import Program from "./infodb/program";
import UiUx from "./infodb/uiux";
import Automation from "./infodb/automation";
import Ai from "./infodb/ai";
import Multimedia from "./infodb/multimedia";
import Remote from "./infodb/remote";

const componentMap: { [key: string]: React.FC } = {
  program: Program,
  uiux: UiUx,
  automation: Automation,
  ai: Ai,
  multimedia: Multimedia,
  remote: Remote,
};

export default function LandingContent() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeComponent, setActiveComponent] = useState<React.FC | null>(null);
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  const handleCategoryClick = (icon: string, name: string) => {
    const SelectedComponent = componentMap[icon];
    setActiveCategory(name);
    setActiveComponent(() => SelectedComponent || null);
  };

  return (
    <div className="landing-wrapper">
      <h1 className="landing-title">
        {activeCategory ?? "The Information Database"}
      </h1>
      <div className="landing-body">
        {activeComponent ? (
          <>{React.createElement(activeComponent)}</>
        ) : (
          Object.entries(categories).map(([categoryName, items]) => (
            <div className="landing-categ-rows" key={categoryName}>
              <div className="landing-info-categ">
                {items.map((item, index) =>
                  item.name ? (
                    <div
                      key={index}
                      className="categ-box"
                      onClick={() => handleCategoryClick(item.icon, item.name)}
                      onMouseEnter={() => setHoveredIcon(item.icon)}
                      onMouseLeave={() => setHoveredIcon(null)}
                      style={{ cursor: "pointer" }}
                    >
                      {item.icon && (
                        <img
                          src={`./src/assets/${item.icon}${hoveredIcon === item.icon ? "-hover" : ""}.svg`}
                          alt={`${item.name} icon`}
                          className="categ-icon"
                        />
                      )}
                      <span className="categ-name">{item.name}</span>
                    </div>
                  ) : (
                    <div key={index} className="categ-box empty">
                      —
                    </div>
                  )
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
