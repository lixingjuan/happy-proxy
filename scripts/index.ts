const fsPromises = require("fs/promises");

/** response  */
fsPromises.access("Db/response").catch(() =>
  fsPromises.mkdir("Db").then(() => {
    fsPromises.mkdir("Db/response");
    fsPromises.writeFile("Db/index.json", JSON.stringify({}));
  })
);
