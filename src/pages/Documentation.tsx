import { useEffect, useState } from "react";

type Doc = {
  id: string;
  title: string;
  filename: string;
  date: string;
  content: string;
  rawContent: string;
};

export default function Documentation() {
  const [docs, setDocs] = useState<Doc[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDoc, setSelectedDoc] = useState<Doc | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const openModal = (doc: Doc) => {
    setSelectedDoc(doc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDoc(null);
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

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
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onClick={() => openModal(doc)}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#1a1a1a";
                e.currentTarget.style.borderColor = "#0f0";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#111";
                e.currentTarget.style.borderColor = "lime";
              }}
            >
              <h2 style={{ margin: "0 0 0.5rem 0", color: "lime" }}>
                {doc.title}
              </h2>
              <p style={{ 
                margin: "0 0 0.5rem 0", 
                color: "#ccc",
                fontSize: "0.9rem" 
              }}>
                Created: {formatDate(doc.date)}
              </p>
              <p style={{ 
                margin: "0",
                color: "#aaa",
                fontSize: "0.9rem",
                fontStyle: "italic"
              }}>
                Click to read full content...
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Modal Popup */}
      {isModalOpen && selectedDoc && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            padding: "2rem",
          }}
          onClick={closeModal}
        >
          <div
            style={{
              backgroundColor: "#111",
              border: "2px solid lime",
              borderRadius: "12px",
              padding: "2rem",
              maxWidth: "600px",
              width: "100%",
              maxHeight: "80vh",
              overflow: "auto",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                background: "none",
                border: "1px solid lime",
                color: "lime",
                borderRadius: "50%",
                width: "2rem",
                height: "2rem",
                cursor: "pointer",
                fontSize: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ×
            </button>

            {/* Modal Content */}
            <h2 style={{ 
              color: "lime", 
              margin: "0 0 1rem 0",
              paddingRight: "3rem"
            }}>
              {selectedDoc.title}
            </h2>
            
            <p style={{ 
              color: "#ccc", 
              margin: "0 0 1.5rem 0",
              fontSize: "0.9rem",
              borderBottom: "1px solid #333",
              paddingBottom: "1rem"
            }}>
              Created: {formatDate(selectedDoc.date)}
            </p>

            <div
              style={{
                color: "#fff",
                lineHeight: "1.6",
                whiteSpace: "pre-wrap",
                fontFamily: "monospace",
                fontSize: "0.95rem",
              }}
            >
              {selectedDoc.content}
            </div>

            <div style={{ 
              marginTop: "2rem", 
              paddingTop: "1rem",
              borderTop: "1px solid #333",
              fontSize: "0.8rem",
              color: "#666"
            }}>
              File: {selectedDoc.filename}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}