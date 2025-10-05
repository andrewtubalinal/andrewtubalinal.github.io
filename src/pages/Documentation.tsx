import { useEffect, useState } from "react";

type Doc = {
  id: string;
  title: string;
  message: string;
};

export default function Documentation() {
  const [docs, setDocs] = useState<Doc[]>([]);

  useEffect(() => {
    const fetchDocs = async () => {
      const res = await fetch("/api/docs");
      const data = await res.json();
      if (data.success) setDocs(data.docs);
    };
    fetchDocs();
  }, []);
  
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
      <h1 style={{ textAlign: "center" }}>Documentation</h1>
      {docs.length === 0 ? (
        <p style={{ textAlign: "center" }}>No documents yet.</p>
      ) : (
        docs.map((doc) => (
          <div
            key={doc.id}
            style={{
              border: "1px solid lime",
              borderRadius: "8px",
              padding: "1rem",
              marginBottom: "1rem",
              backgroundColor: "#111",
            }}
          >
            <h2>{doc.title}</h2>
            <p>{doc.message}</p>
          </div>
        ))
      )}
    </div>
  );
}
