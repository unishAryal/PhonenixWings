const express = require('express');
const cors = require('cors');
const multer = require('multer');
const crypto = require('crypto');
const bodyParser = require('body-parser');
// const sql = require('mssql')
// const config = require('./config/db');
const { SlowBuffer } = require('buffer');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json()); // For JSON payloads



// Configure multer for file uploads
const upload = multer({  storage: multer.memoryStorage()}); // 

app.post("/send-message", upload.single('file'), async (req, res) => {
  try{
      const userMessage = req.body.message; // Get the message from the body
      const file = req.file; // Access the uploaded file
      console.log(userMessage);
      console.log(file); // Log the file object for debugging

      const authToken = crypto.randomBytes(8).toString("hex");
      console.log(authToken);

      // adding to the database or quering from the database should be here.
      // for adding the file from multer memoryStorage, you need to say file.buffer

      res.json({ message: 'Message received', authToken });
  }
  catch(err) {
    console.error(err);
    res.status(500).send('Server error');
  } 
  // finally{
  //   await sql.close();
  // }
});


app.post("/signInAuthentication", async (req, res) => {
  try {
    const { userName, passWord } = req.body;
    console.log(userName);
    console.log(passWord); 

    //  authentication logic here

    // Send a response
    res.status(200).json({ message: "Authentication successful" });
  }
  catch(err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  } 
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
