import fs from "fs";
import path from "path";

export default async function handler(req) {
  const filePath = path.join(process.cwd(), "data", "docs.json");

  try {
    if (req.method === "POST") {
      const body = await req.json(); // ✅ Parse body from Request object
      const fileData = fs.existsSync(filePath)
        ? fs.readFileSync(filePath, "utf-8")
        : "[]";
      const docs = JSON.parse(fileData);

      docs.push(body);

      fs.writeFileSync(filePath, JSON.stringify(docs, null, 2));

      return new Response(JSON.stringify({ message: "Success" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (req.method === "GET") {
      const fileData = fs.existsSync(filePath)
        ? fs.readFileSync(filePath, "utf-8")
        : "[]";
      const docs = JSON.parse(fileData);

      return new Response(JSON.stringify(docs), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ message: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error accessing docs.json:", error);
    return new Response(JSON.stringify({ message: "Failed to document." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
