export default function Resume() {
  return (
    <div className="resume-container">
      {/* Header Section */}
      <header className="resume-header">
        <h1 className="glitch-title">YOUR NAME</h1>
        <div className="resume-contact">
          <p className="terminal-text">email@example.com | (123) 456-7890 | City, State</p>
          <p className="terminal-text">LinkedIn | Portfolio | GitHub</p>
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="resume-grid">
        {/* Left Column */}
        <div className="resume-column">
          {/* Professional Summary */}
          <section className="resume-section">
            <h2 className="section-title">PROFESSIONAL SUMMARY</h2>
            <div className="terminal-box">
              <p className="terminal-text">
                [Cyberpunk-themed summary highlighting key skills and experience]
              </p>
            </div>
          </section>

          {/* Technical Skills */}
          <section className="resume-section">
            <h2 className="section-title">TECHNICAL SKILLS</h2>
            <div className="terminal-box">
              <div className="skills-grid">
                <div className="skill-category">
                  <h3 className="skill-title">FRONTEND</h3>
                  <ul className="skill-list">
                    <li>React/Next.js</li>
                    <li>TypeScript</li>
                    <li>HTML/CSS</li>
                    <li>Tailwind</li>
                  </ul>
                </div>
                <div className="skill-category">
                  <h3 className="skill-title">BACKEND</h3>
                  <ul className="skill-list">
                    <li>Node.js</li>
                    <li>Python</li>
                    <li>PostgreSQL</li>
                    <li>REST/GraphQL</li>
                  </ul>
                </div>
                <div className="skill-category">
                  <h3 className="skill-title">TOOLS</h3>
                  <ul className="skill-list">
                    <li>Git</li>
                    <li>Docker</li>
                    <li>AWS</li>
                    <li>CI/CD</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="resume-column">
          {/* Experience */}
          <section className="resume-section">
            <h2 className="section-title">EXPERIENCE</h2>
            <div className="terminal-box">
              <div className="experience-item">
                <div className="experience-header">
                  <h3 className="job-title">SOFTWARE ENGINEER</h3>
                  <span className="experience-date">2023 - PRESENT</span>
                </div>
                <p className="company-name">TECH CORP | CYBER CITY</p>
                <ul className="experience-list">
                  <li>Developed scalable applications using React & Node.js</li>
                  <li>Implemented CI/CD pipelines reducing deployment time by 40%</li>
                  <li>Led migration to microservices architecture</li>
                </ul>
              </div>

              <div className="experience-item">
                <div className="experience-header">
                  <h3 className="job-title">JUNIOR DEVELOPER</h3>
                  <span className="experience-date">2021 - 2023</span>
                </div>
                <p className="company-name">STARTUP INC | NEON DISTRICT</p>
                <ul className="experience-list">
                  <li>Built responsive frontend components</li>
                  <li>Optimized database queries improving performance by 60%</li>
                  <li>Collaborated with design team on UX improvements</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Education & Projects */}
          <div className="resume-row">
            <section className="resume-section">
              <h2 className="section-title">EDUCATION</h2>
              <div className="terminal-box">
                <h3 className="degree">B.S. COMPUTER SCIENCE</h3>
                <p className="institution">CYBER UNIVERSITY | 2021</p>
                <p className="education-details">GPA: 3.8/4.0</p>
              </div>
            </section>
            
            <section className="resume-section">
              <h2 className="section-title">PROJECTS</h2>
              <div className="terminal-box">
                <h3 className="project-name">NEON PORTFOLIO</h3>
                <p className="project-desc">Interactive cyberpunk portfolio</p>
                <p className="project-tech">React, Three.js, WebGL</p>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="resume-footer">
        <p className="terminal-text">ACCESS LEVEL: CLEARED | STATUS: AVAILABLE FOR DEPLOYMENT</p>
      </footer>
    </div>
  );
}