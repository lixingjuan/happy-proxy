const fsPromises = require("fs/promises");

/** response  */
fsPromises.access("DB/response").catch(() =>
  fsPromises.mkdir("DB").then(() => {
    fsPromises.mkdir("DB/response");
    fsPromises.writeFile("DB/index.json", JSON.stringify({}));
  })
);
