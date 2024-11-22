const express = require("express");
const app = express();
const fs = require("fs");

app.use(express.json());

// Load JSON challenge data
app.get("/challenge/:level/:name", (req, res) => {
  const { level, name } = req.params;
  const challengesPath = "./src/challenges/challenges.json";
  const challenges = JSON.parse(fs.readFileSync(challengesPath));
  
  const challenge = challenges.find(
    (ch) => ch.file.replace(".json", "") === name && ch.level === parseInt(level)
  );

  if (!challenge) {
    return res.status(404).send("Challenge not found or level mismatch.");
  }

  const path = `./src/challenges/${challenge.file}`;
  if (fs.existsSync(path)) {
    const challengeData = JSON.parse(fs.readFileSync(path));
    res.json(challengeData);
  } else {
    res.status(404).send("Challenge data file not found.");
  }
});


app.get("/challenges", (req, res) => {
  const challengesPath = "./src/challenges/challenges.json";
  const challenges = JSON.parse(fs.readFileSync(challengesPath));
  res.json(challenges);
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

// leaderboard
let leaderboard = { 1: [], 2: [] };

app.get("/leaderboard/:level", (req, res) => {
  const { level } = req.params;
  const levelLeaderboard = leaderboard[level];
  if (levelLeaderboard) {
    res.json(levelLeaderboard);
  } else {
    res.status(404).send("Level leaderboard not found.");
  }
});

app.post("/leaderboard/:level", (req, res) => {
  const { level } = req.params;
  const { username, score } = req.body;
  if (!leaderboard[level]) leaderboard[level] = [];
  
  leaderboard[level].push({ username, score });
  leaderboard[level].sort((a, b) => b.score - a.score); 
  res.send(`Leaderboard for level ${level} updated.`);
});


const PORT = 3000;
app.listen(PORT, () => console.log(`CTF server running on http://localhost:${PORT}`));
