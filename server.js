const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json({ limit: "50mb" }));

const userId = "AnanthaTeja_20122003";

const getFileDetailsFromBase64 = (base64String) => {
  const matches = base64String.match(/^data:(.+);base64,(.+)$/);
  if (!matches) return null;

  const mimeType = matches[1];
  const buffer = Buffer.from(matches[2], "base64");
  const fileSizeKB = (buffer.length / 1024).toFixed(2);

  return {
    mimeType,
    fileSizeKB,
  };
};

app.post("/bfhl", (req, res) => {
  const { data, file_b64 } = req.body;

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
    } else if (typeof item === "string" && /^[a-zA-Z]$/.test(item)) {
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
  const fileDetails = file_b64 ? getFileDetailsFromBase64(file_b64) : null;
  const fileValid = !!fileDetails;

  if (file_b64 && !fileValid) {
    return res.status(400).json({
      is_success: false,
      user_id: userId,
      message: "Invalid base64 format for 'file_b64'.",
    });
  }

  const response = {
    is_success: true,
    user_id: "AnanthaTeja_Dasari_20122003", // Adjust user data as required
    email: "ananthateja_dasari@srmap.edu.in",
    roll_number: "AP21110011369",
    numbers: numbers,
    alphabets: alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet,
    file_valid: fileValid,
  };

  if (fileValid) {
    response.file_mime_type = fileDetails.mimeType;
    response.file_size_kb = fileDetails.fileSizeKB;
  }

  res.json(response);
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
