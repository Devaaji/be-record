import express from "express";
import bodyParser from 'body-parser';
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/databases.js";
import TerminalRoutes from "./routers/index.js";


const app = express();

dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use((_req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

TerminalRoutes(app);

(async () => {
  try {
    await db.authenticate().then(() => {
      console.log("Berhasil Connect Ke Databases");
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();


app.listen(5050, () => {
  console.log("Server is listening on port 3030");
});

// const express = require("express");
// const multer = require("multer");
// const cors = require("cors");
// const app = express();
// const port = 5050;

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}-${file.originalname}.mp4`);
//   },
// });

// const upload = multer({ storage });

// app.post("/api/upload", upload.single("video"), (req, res) => {
//   console.log("Video berhasil diunggah:", req.file);
//   res.status(200).json({ message: "Video berhasil diunggah" });
// });

// app.listen(port, () => {
//   console.log(`Server berjalan di http://localhost:${port}`);
// });

