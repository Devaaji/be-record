import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}.mp4`);
  },
});

const uploadRecord = multer({ storage: storage }).single("video");

export default uploadRecord;
