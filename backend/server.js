import express from "express";
import path from "path"; //help me to creat file paths like "C:\\Users\\Amar\\project\\admin\\dist"
import { ENV } from "./src/config/env.js";
import { connectDB } from "./src/config/db.js";
import { clerkMiddleware } from "@clerk/express";
import inngestHandler from "./src/api/inngest.js";
const app = express();
const __dirname = path.resolve(); //return path of your current project

app.use(express.json());
app.use(clerkMiddleware()); //this help to add auth in the req so i can use req.auth

app.use("/api/inngest", inngestHandler);
app.get("/api/health", (req, res) => {
  res.json({ message: "Success" });
});

//hello
//make our app ready for deployment
if (ENV.NODE_ENV === "production") {
  //Any request that is NOT an API route AND NOT a real static file, is sent to index.html.
  app.use(express.static(path.join(__dirname, "../admin/dist")));

  app.get("/{*any}", (req, res) => {
    if (req.path.startsWith("/api")) return;
    res.sendFile(path.join(__dirname, "../admin", "dist", "index.html"));
  });
}
app.listen(ENV.PORT, () => {
  console.log("Server is running");
  connectDB();
});
