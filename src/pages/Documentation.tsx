import { useEffect, useState } from "react";

type Doc = {
  id: string;
  title: string;
  filename: string;
  url: string;
};

export default function Documentation() {
  const [docs, setDocs] = useState<Doc[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/docs");
        const data = await res.json();
        
        if (data.success) {
          setDocs(data.docs);
        } else {
          setError(data.message || "Failed to load documents");
        }
      } catch (err) {
        setError("Failed to fetch documents");
        console.error("Error fetching docs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDocs();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "transparent",
          color: "#FFF",
          padding: "2rem",
          fontFamily: "monospace",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p>Loading documents...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "transparent",
          color: "#FFF",
          padding: "2rem",
          fontFamily: "monospace",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <p style={{ color: "red" }}>Error: {error}</p>
        <button 
          onClick={() => window.location.reload()}
          style={{
            marginTop: "1rem",
            border: "1px solid lime",
            background: "black",
            color: "lime",
            padding: "0.5rem 1rem",
            cursor: "pointer",
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "transparent",
        color: "#FFF",
        padding: "2rem",
        fontFamily: "monospace",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>Documentation</h1>
      
      {docs.length === 0 ? (
        <p style={{ textAlign: "center" }}>No documents yet.</p>
      ) : (
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          {docs.map((doc) => (
            <div
              key={doc.id}
              style={{
                border: "1px solid lime",
                borderRadius: "8px",
                padding: "1.5rem",
                marginBottom: "1rem",
                backgroundColor: "#111",
              }}
            >
              <h2 style={{ margin: "0 0 0.5rem 0", color: "lime" }}>
                {doc.title}
              </h2>
              <p style={{ 
                margin: "0 0 1rem 0", 
                color: "#ccc",
                fontSize: "0.9rem" 
              }}>
                File: {doc.filename}
              </p>
              <a
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "lime",
                  textDecoration: "none",
                  border: "1px solid lime",
                  padding: "0.25rem 0.5rem",
                  borderRadius: "4px",
                  display: "inline-block",
                }}
              >
                View Raw Content
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}