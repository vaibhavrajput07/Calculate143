require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');

const loveRoutes = require('./routes/love');
const passwordRoutes = require('./routes/Password'); // Import the password route

// Initialize the Express app
const app = express();

const port = process.env.PORT || 5000;

  // Serve frontend in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'))
    );
  }

// Middleware
app.use(bodyParser.json());
app.use(cors());

const dbURI = process.env.ATLASDB_URL;

// Connect to MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB Connected...");
  })
  .catch(err => {
    console.log("MongoDB connection error: ", err);
  });



// Routes
app.use('/api', loveRoutes);
app.use('/api/password', passwordRoutes); // Password route for setting and checking password

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
