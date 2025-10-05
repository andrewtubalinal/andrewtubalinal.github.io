import React, { useState } from "react";

export default function CreateDocumentation() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [popup, setPopup] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/docs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    const data = await res.json();
    if (data.success) {
      setPopup("Alright, documented it.");
      setTitle("");
      setMessage("");
      setTimeout(() => setPopup(""), 1500);
    } else {
      setPopup("Failed to document.");
      setTimeout(() => setPopup(""), 1500);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#000",
        color: "#0f0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "monospace",
      }}
    >
      <h1>Create Documentation</h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", width: "300px" }}
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="retro-input"
          required
          style={{ marginBottom: "0.5rem" }}
        />
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="retro-input"
          required
          rows={4}
          style={{ marginBottom: "0.5rem", resize: "none" }}
        />
        <button
          type="submit"
          className="retro-button"
          style={{
            border: "2px solid lime",
            background: "black",
            color: "lime",
            padding: "0.5rem",
            cursor: "pointer",
          }}
        >
          Document it!
        </button>
      </form>

      {popup && (
        <div
          style={{
            marginTop: "1rem",
            backgroundColor: "#111",
            border: "1px solid lime",
            padding: "0.5rem 1rem",
            borderRadius: "5px",
          }}
        >
          {popup}
        </div>
      )}
    </div>
  );
}
