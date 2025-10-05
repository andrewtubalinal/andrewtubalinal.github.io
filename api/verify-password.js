export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ success: false });

  const { password } = req.body;

  if (password === process.env.APP_PASSWORD) {
    return res.status(200).json({ success: true, route: "/" });
  }

  if (password === process.env.DOC_PASSWORD) {
    return res.status(200).json({ success: true, route: "/create-documentation" });
  }

  return res.status(401).json({ success: false });
}
