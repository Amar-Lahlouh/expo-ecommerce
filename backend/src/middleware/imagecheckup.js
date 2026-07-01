export const validateImage = (req, res, next) => {
  const file = req.file;

  // 1. Check if file exists
  if (!file) {
    return res.status(400).json({
      message: "No file uploaded",
    });
  }

  // 2. Allowed image types only
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp"];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    return res.status(400).json({
      message: "Only JPG, PNG, and WEBP images are allowed",
    });
  }

  // 3. Optional: file size limit (2MB)
  const MAX_SIZE = 2 * 1024 * 1024;

  if (file.size > MAX_SIZE) {
    return res.status(400).json({
      message: "Image must be less than 2MB",
    });
  }

  // 4. If everything is valid → continue
  next();
};
