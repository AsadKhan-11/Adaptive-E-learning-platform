const { spawn } = require("child_process");

const predictDifficulty = (currentDifficulty, totalAttempts, totalCorrect) => {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn("python3", [
      "../ai/inference.py",
      currentDifficulty,
      totalAttempts,
      totalCorrect,
    ]);

    pythonProcess.stdout.on("data", (data) => {
      resolve(Number(data.toString()));
    });

    pythonProcess.stderr.on("data", (data) => {
      reject(data.toString());
    });
  });
};

module.exports = predictDifficulty;
