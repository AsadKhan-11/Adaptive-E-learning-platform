const { spawn } = require("child_process");
const path = require("path");

const predictDifficulty = (currentDifficulty, totalAttempts, totalCorrect) => {
  return new Promise((resolve, reject) => {
    if (
      isNaN(currentDifficulty) ||
      isNaN(totalAttempts) ||
      isNaN(totalCorrect)
    ) {
      reject(new Error("One or more inputs are not valid numbers."));
      return;
    }

    const pythonProcess = spawn("python", [
      path.resolve(__dirname, "../../ai/inference.py"),
      String(currentDifficulty),
      String(totalAttempts),
      String(totalCorrect),
    ]);

    let result = "";
    let error = "";

    pythonProcess.stdout.on("data", (data) => {
      result += data.toString();
    });

    // Collect errors from stderr
    pythonProcess.stderr.on("data", (data) => {
      error += data.toString();
    });

    // Handle process exit
    pythonProcess.on("close", (code) => {
      if (code !== 0) {
        console.error(`Python process exited with code ${code}: ${error}`);
        reject(new Error(error || "Python script failed."));
        return;
      }

      // Parse the final output
      const nextDifficulty = Number(result.trim()); // Trim and convert to number

      if (isNaN(nextDifficulty)) {
        reject(new Error("Python script returned NaN or invalid data."));
      } else {
        resolve(nextDifficulty);
      }
    });
  });
};

module.exports = predictDifficulty;
