// Validating or checking the mime type of files in our filesystem
const cp = require("child_process");

cp.exec(`file --brief --mime ${__filename}`, (err, mime) => console.log(mime));
