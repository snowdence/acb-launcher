const express = require("express");
const app = express();
const port = 5001;
const delay = require("delay");
const kill = require("tree-kill");

var currentPID = -1;

var spawn = require("child_process").spawn;

var funcStartSafekey = function () {
  console.log("fun() start");
  let mainSafekey = spawn("./main.exe");
  currentPID = mainSafekey.pid;
  console.log("fun() start with PID " + mainSafekey.pid);

  mainSafekey.stdout.on("data", function (data) {
    console.log("stdout: " + data.toString());
  });

  mainSafekey.stderr.on("data", function (data) {
    console.log("stderr: " + data.toString());
  });

  mainSafekey.on("exit", function (code) {
    console.log("child process exited with code " + code.toString());
  });
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/current-pid", (req, res) => {
  return res.json({
    success: true,
    data: {
      currentPID,
    },
  });
});

app.get("/reset-acb", async (req, res) => {
  let is_kill = false;
  if (currentPID != -1) {
    //kill
    console.log("killing " + currentPID);
    kill(currentPID);
    is_kill = true;
  }
  funcStartSafekey();
  return res.json({
    success: true,
    is_kill: is_kill,
    data: {
      currentPID: currentPID,
    },
  });
});

app.listen(port, () => {
  console.log(`Launcher listening on port ${port}`);
});
