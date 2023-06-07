const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();

// parse application/json
app.use(bodyParser.json());

// Function to handle response
const handleResponse = (req, res, endpoint) => {
  const { index, type } = req.body;

  // Construct the filename
  const filename = `./output/${index}/${endpoint}.json`;

  // Read and return the file content
  fs.readFile(filename, (err, data) => {
    if (err) {
      res.status(500).json({ message: `Error reading file: ${filename}` });
    } else {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    }
  });
};

app.post("/api/handshake", function (req, res) {
  return res.json(req.body);
});

// Implementing the /api/fields route
app.post("/api/fields", function (req, res) {
  handleResponse(req, res, "fields");
});

// Implementing the /api/members route
app.post("/api/members", function (req, res) {
  handleResponse(req, res, "members");
});

// Implementing the /api/select route
app.post("/api/select", function (req, res) {
  handleResponse(req, res, "select");
});

// Start the server
app.listen(3000, function () {
  console.log("App is listening on port 3000!");
});
