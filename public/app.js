document.getElementById("submit").addEventListener("click", async () => {
    const input = document.getElementById("input").value;
    const response = await fetch("/validate/beginner/decodeCoordinates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ submission: input }),
    });
    const result = await response.text();
    document.getElementById("result").innerText = result;
  });

document.getElementById("result").innerText =
    result === "Incorrect submission"
    ? "Oops! Try decoding the coordinates again."
    : result;

  