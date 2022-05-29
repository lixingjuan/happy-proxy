const fs = require("fs/promises");

fs.rm("response", {
  force: true,
  recursive: true,
}).then(
  (res: any) => {
    console.log("succeeded", res);
    fs.mkdir("response");
  },
  (err: any) => {
    console.log("err", err.message);
  }
);
