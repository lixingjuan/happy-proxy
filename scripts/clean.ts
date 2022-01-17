const fs = require("fs/promises");

fs.rm("response", {
  force: true,
  recursive: true,
}).then(
  (res) => {
    console.log("succeeded", res);
    fs.mkdir("response");
  },
  (err) => {
    console.log("err", err.message);
  }
);
fs.rm("logs", {
  force: true,
  recursive: true,
}).then(
  (res) => {
    console.log("succeeded", res);
    fs.mkdir("logs");
  },
  (err) => {
    console.log("err", err.message);
  }
);
