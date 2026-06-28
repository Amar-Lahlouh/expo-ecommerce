import express from "express";

const app = express();
app.get("/api/health", (req, res) => {
  res.json({ message: "Success" });
});
app.listen(3000, () => {
  console.log("Server is running");
});
