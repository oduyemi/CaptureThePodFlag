const fs = require("fs");

const validateDecodeCoordinates = (input) => {
  const challengeData = JSON.parse(
    fs.readFileSync("./src/challenges/decodeCoordinates.json")
  );
  const expectedCoordinates = Object.values(challengeData.data).map((encoded) =>
    Buffer.from(encoded, "base64").toString("utf-8")
  );

  const decoded = Buffer.from(input, "base64").toString("utf-8");
  if (expectedCoordinates.includes(decoded)) {
    return challengeData.flag_format;
  }
  return "Incorrect submission";
};

module.exports = validateDecodeCoordinates;
