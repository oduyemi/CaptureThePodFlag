const express = require("express");
const app = express();
const fs = require("fs");

app.use(express.json());

// Load JSON challenge data
app.get("/challenge/:level/:name", (req, res) => {
  const { level, name } = req.params;
  const path = `./src/challenges/${name}.json`; 
  try{
    if (fs.existsSync(path)) {
      const challenge = JSON.parse(fs.readFileSync(path));
      res.json(challenge);
    } else {
      res.status(404).send("Challenge not found");
  }} catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while processing your request.");
  }
});

// Validate submissions
app.post("/validate/:name", (req, res) => {
  try{
    const { name } = req.params;
    const { submission } = req.body;
    const validationScript = `./src/challenges/${name}.js`;
    const challengePath = `./src/challenges/${name}.json`;

    if (fs.existsSync(validationScript) && fs.existsSync(challengePath)) {
      delete require.cache[require.resolve(validationScript)];
      const validator = require(validationScript);
      const result = validator(submission);
      res.send(result);
    } else {
      res.status(404).send("Challenge or validation script not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while processing your request.");
  }
});



const PORT = 3000;
app.listen(PORT, () => console.log(`CTF server running on http://localhost:${PORT}`));
