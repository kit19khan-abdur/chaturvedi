const express = require("express");
const cors = require("cors");
const product = require("./product.js")
const sampleData = require("./Sample.js")

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample data


// GET endpoint
app.get("/api/details", (req, res) => {


    res.json(sampleData);
 
});
app.get("/api/product", (req, res) => {


    res.json(product);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
