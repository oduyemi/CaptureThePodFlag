const { validateDecodeCoordinates } = require("../src/challenges/decodeCoordinates");

test("Valid Base64 input", () => {
  const input = "Ni41NTg0LDNFMzkxNQ=="; // Gbagada
  expect(validateDecodeCoordinates(input)).toBe("FLAG{decoded_coordinates}");
});

test("Invalid Base64 input", () => {
  const input = "InvalidBase64";
  expect(validateDecodeCoordinates(input)).toBe("Incorrect submission");
});
