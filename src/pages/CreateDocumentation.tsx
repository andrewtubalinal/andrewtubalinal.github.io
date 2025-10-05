/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

export default function CreateDocumentation() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(""); // replaced unused popup

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !message.trim()) return;

    setStatus("Saving to GitHub...");

    try {
      const res = await fetch("/api/docs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content: message }),
      });

      // ✅ Safely handle non-JSON errors
      let data: any;
      try {
        data = await res.json();
      } catch {
        const text = await res.text();
        throw new Error(text);
      }

      if (res.ok) {
        setStatus("✅ Documented successfully!");
        setTitle("");
        setMessage("");
      } else {
        setStatus(`❌ Failed: ${data.message || "Unknown error"}`);
      }
    } catch (err: any) {
      setStatus(`❌ Error: ${err.message}`);
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
          style={{
            marginBottom: "0.5rem",
            border: "1px solid lime",
            background: "black",
            color: "lime",
            padding: "0.5rem",
          }}
        />
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="retro-input"
          required
          rows={4}
          style={{
            marginBottom: "0.5rem",
            resize: "none",
            border: "1px solid lime",
            background: "black",
            color: "lime",
            padding: "0.5rem",
          }}
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

      {status && (
        <div
          style={{
            marginTop: "1rem",
            backgroundColor: "#111",
            border: "1px solid lime",
            padding: "0.5rem 1rem",
            borderRadius: "5px",
          }}
        >
          {status}
        </div>
      )}
    </div>
  );
}
