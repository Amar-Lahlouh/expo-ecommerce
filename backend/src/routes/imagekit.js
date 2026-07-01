import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";
import ImageKit from "imagekit";
import fs from "fs";
import { ENV } from "../config/env.js";
const router = Router();
// imagekit auth
console.log("djd");
router.get("/", async (req, res) => {
  let imagekit = new ImageKit({
    publicKey: ENV.IMAGEKIT_PUBLIC_KEY,
    privateKey: ENV.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: ENV.IMAGEKIT_URL_ENDPOINT,
  });

  let authenticationParameters = imagekit.getAuthenticationParameters();
  console.log(authenticationParameters);
  return res.status(200).json(authenticationParameters);
});

export default router;
