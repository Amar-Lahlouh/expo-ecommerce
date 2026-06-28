import express from "express";
import path from "path"; //help me to creat file paths like "C:\\Users\\Amar\\project\\admin\\dist"
import { ENV } from "./src/config/env.js";
const app = express();
const __dirname = path.resolve(); //return path of your current project
app.get("/api/health", (req, res) => {
  res.json({ message: "Success" });
});

//make our app ready for deployment
if (ENV.NODE_ENV === "production") {
  //Any request that is NOT an API route AND NOT a real static file, is sent to index.html.
  app.use(express.static(path.join(__dirname, "../admin/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../admin", "dist", "index.html"));
  });
}
app.listen(ENV.PORT, () => {
  console.log("Server is running");
});
