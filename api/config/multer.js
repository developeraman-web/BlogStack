import multer from "multer";

multer;
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

function fileFilter(req, file, cb) {
  const alloweFiles = ["image/png", "image/jpg", "image/jpeg", "image/webp"];
  if (!alloweFiles.includes(file.mimetype)) {
    cb(new Error("only images are allowed"), false);
  } else {
    cb(null, true);
  }
}

const upload = multer({ storage: storage, fileFilter: fileFilter });
export default upload;
