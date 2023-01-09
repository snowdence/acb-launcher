console.log("Main");
var exec = require("child_process").execFile;

var fun = function () {
  console.log("fun() start");
  exec("main.exe", function (error, stdout, stderr) {
    if (error) {
      console.log(error);
    }

    console.log(stdout.toString());
  });
};
fun();
