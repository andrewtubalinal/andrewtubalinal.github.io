/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import categories from "../js/category.json";
import "../css/Pages.css";

import Program from "./infodb/program";
import UiUx from "./infodb/uiux";
import Automation from "./infodb/automation";
import Ai from "./infodb/ai";
import Multimedia from "./infodb/multimedia";
import Remote from "./infodb/remote";
import Logic from "./infodb/logic";
import Vision from "./infodb/vision";
import Auditory from "./infodb/auditory";
import Vocalization from "./infodb/vocalization";
import Motion from "./infodb/motion";
import Motive from "./infodb/motive";

const componentMap: { [key: string]: React.FC } = {
  program: Program,
  uiux: UiUx,
  automation: Automation,
  ai: Ai,
  multimedia: Multimedia,
  remote: Remote,
  logic: Logic,
  vision: Vision,
  auditory: Auditory,
  vocalization: Vocalization,
  motion: Motion,
  motive: Motive
};

export default function LandingContent() {
  // @ts-ignore
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeComponent, setActiveComponent] = useState<React.FC | null>(null);
  const [activeFormal, setActiveFormal] = useState<string | null>(null);
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  const handleCategoryClick = (icon: string, name: string, formal: string) => {
    const SelectedComponent = componentMap[icon];
    setActiveCategory(name);
    setActiveFormal(formal);
    setActiveComponent(() => SelectedComponent || null);
  };
  
  return (
    <div className="landing-wrapper">
      <h1 className="landing-title">
        {activeFormal ?? "The Information Database"}
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
                      onClick={() => handleCategoryClick(item.icon, item.name, item.formal)}
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
