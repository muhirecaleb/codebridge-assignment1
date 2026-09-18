require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const bcrypt = require("bcrypt");
const pool = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const errorHandler = require("./middleware/errorHandler");

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is required");
}

const app = express();

app.disable("x-powered-by");
app.use(cors());
app.use(express.json({ limit: "100kb" }));

app.use(
  "/api/auth",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50,
    standardHeaders: true,
    legacyHeaders: false,
  }),
);

app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "CodeBridge API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/admin", adminRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.use(errorHandler);

if (require.main === module) {
  const port = Number(process.env.PORT || 5000);
  const start = async () => {
    const password = await bcrypt.hash(
      "admin123",
      Number(process.env.BCRYPT_ROUNDS || 12),
    );
    await pool.execute(
      `INSERT INTO users (full_name, email, password, role)
       VALUES (?, ?, ?, 'admin')
       ON DUPLICATE KEY UPDATE full_name = VALUES(full_name), password = VALUES(password), role = 'admin'`,
      ["CodeBridge Administrator", "admin@gmail.com", password],
    );
    app.listen(port, () =>
      console.log(`CodeBridge API running on port ${port}`),
    );
  };

  start().catch((error) => {
    console.error("Unable to start CodeBridge API:", error);
    process.exitCode = 1;
  });
}

module.exports = app;
