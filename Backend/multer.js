import multer from "multer";

const memoryStorage = multer.memoryStorage();

const upload = multer({
  storage: memoryStorage,
  limits: { fileSize: 200 * 1024 }, // Max limit is 200kB.
  fileFilter: (req, file, cb) => {
    // Defines the file type that are acceptable
    const acceptedFileTypes = [
      "image/jpg",
      "image/png",
      "image/jpeg",
      "image/avif",
      "image/webp",
    ];
    if (acceptedFileTypes.includes(file.mimetype)) cb(null, true);
    else
      cb(
        new Error("Only JPG, PNG, JPEG, AVIF, and WEBP files are allowed!"),
        false
      );
  },
});

export default upload.single("picture");
