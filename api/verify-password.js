// /api/verify-password.js

export default function handler(req, res) {
  const { password } = req.body;

  // Access your environment variable securely
  const secret = process.env.APP_PASSWORD;

  if (password === secret) {
    return res.status(200).json({ success: true });
  } else {
    return res.status(401).json({ success: false });
  }
}
