import React from "react";

export default function Program() {
  return (
    <div className="infodb-container">
      <h1 className="infodb-title">Programming</h1>
      <p className="infodb-description">
        InfoDB to the Programming section of your Information Bank. This is where you'll find curated knowledge, concepts, and notes related to software development. Whether you're exploring language syntax, design patterns, development workflows, or frameworks, this is your central archive.
      </p>

      <div className="infodb-section">
        <h2>Languages</h2>
        <ul>
          <li>JavaScript / TypeScript</li>
          <li>Python</li>
          <li>Go</li>
          <li>Rust</li>
          <li>Shell scripting</li>
        </ul>
      </div>

      <div className="infodb-section">
        <h2>Concepts</h2>
        <ul>
          <li>OOP & Functional Programming</li>
          <li>Data Structures & Algorithms</li>
          <li>API Design (REST, GraphQL)</li>
          <li>Version Control (Git)</li>
          <li>Design Patterns</li>
        </ul>
      </div>

      <div className="infodb-section">
        <h2>Frameworks & Tools</h2>
        <ul>
          <li>React / Vue / Svelte</li>
          <li>Node.js / Express</li>
          <li>Vite / Webpack</li>
          <li>Jest / Vitest</li>
        </ul>
      </div>

      <div className="infodb-note">
        <p>
          This section can be expanded with personal notes, code snippets, or diagrams.
          Consider creating subpages or Markdown-imports if needed.
        </p>
      </div>
    </div>
  );
}
