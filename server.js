const express = require("express");
const cors = require("cors");
const multer = require("multer");
const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());
app.use(express.json({ limit: "50mb" }));

const upload = multer({ storage: multer.memoryStorage() });

const userId = "AnanthaTeja_20122003";

// POST /bfhl endpoint
app.post("/bfhl", upload.single("file"), (req, res) => {
  const data = JSON.parse(req.body.data);
  const file = req.file;

  // Input validation
  if (!Array.isArray(data)) {
    return res.status(400).json({
      is_success: false,
      user_id: userId,
      message: "Invalid input format. 'data' should be an array.",
    });
  }

  const numbers = [];
  const alphabets = [];
  const lowercaseAlphabets = [];

  data.forEach((item) => {
    if (!isNaN(item)) {
      numbers.push(item);
    } else if (/^[a-zA-Z]$/.test(item)) {
      alphabets.push(item);
      if (item === item.toLowerCase()) {
        lowercaseAlphabets.push(item);
      }
    }
  });

  const highestLowercaseAlphabet =
    lowercaseAlphabets.length > 0
      ? [lowercaseAlphabets.sort((a, b) => b.localeCompare(a))[0]]
      : [];

  // File handling
  let fileValid = false;
  let fileMimeType = null;
  let fileSizeKB = null;

  if (file) {
    fileValid = true;
    fileMimeType = file.mimetype;
    fileSizeKB = (file.size / 1024).toFixed(2);
  }

  res.json({
    is_success: true,
    user_id: userId,
    email: "ananthateja_dasari@srmap.edu.in",
    roll_number: "AP21110011369",
    numbers: numbers,
    alphabets: alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet,
    file_valid: fileValid,
    file_mime_type: fileMimeType,
    file_size_kb: fileSizeKB,
  });
});
app.get("/", (req, res) => {
  res.json({ operation_code: 1 });
});
app.get("/bfhl", (req, res) => {
  res.json({
    is_success: true,
    operation_code: 1,
  });
});
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
