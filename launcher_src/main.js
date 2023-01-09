console.log("Main");
var spawn = require("child_process").spawn;

var fun = function () {
  console.log("fun() start");
  let mainSafekey = spawn("./main.exe");

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
fun();
