import express from "express";
import uploadRecord from "../middleware/uploadRecord.js";
const router = express.Router();

//POST
router.post("/api/upload", uploadRecord, (req, res) => {
  console.log("Video berhasil diunggah:", req.file);
  res.status(200).json({ message: "Video berhasil diunggah" });
});

//UPDATE

//GET

//DELETE

export default router;
