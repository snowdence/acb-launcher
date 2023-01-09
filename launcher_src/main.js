console.log("Main");
var exec = require("child_process").execFile;

var fun = function () {
  console.log("fun() start");
  exec("main.exe", function (err, data) {
    console.log(err);
    console.log(data.toString());
  });
};
fun();
