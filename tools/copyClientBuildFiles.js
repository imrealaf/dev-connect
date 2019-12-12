const fs = require("fs-extra");
const rCopy = require("recursive-copy");

const srcDir = "./client/build";
const distDir = "./dist/public";
const srcMediaDir = "./client/public/media";
const distMediaDir = "./dist/public/static/media";

fs.emptyDir(distDir)
  .then(() => {
    console.log("Public folder cleaned..");

    fs.copy(srcDir, distDir)
      .then(() => {
        console.log("Client build files copied.");

        // Merge other media folder
        rCopy(srcMediaDir, distMediaDir, { overwrite: false }).then(() => {
          console.log("Other media assets copied.");
        });
      })
      .catch(err => {
        console.error(err);
      });
  })
  .catch(err => {
    console.error(err);
  });
