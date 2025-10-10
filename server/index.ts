import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import appointmentsRouter from "./routes/appointments";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  // Fallback: some serverless providers forward JSON as text
  app.use(express.text({ type: "*/*" }));
  app.use((req, _res, next) => {
    if (typeof req.body === "string") {
      const s = req.body.trim();
      if (s.startsWith("{") || s.startsWith("[")) {
        try {
          (req as any).body = JSON.parse(s);
        } catch {}
      }
    }
    next();
  });

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);
  app.use("/api/appointments", appointmentsRouter);
  // Support Netlify Functions base path when using redirects to /.netlify/functions/api/:splat
  app.use("/.netlify/functions/api/appointments", appointmentsRouter);

  return app;
}
