//function to create a child process that will convert the SVG to PNG
import svg2png from "svg2png";
import fs from "fs";

//convert svg to png
export default (svg, filename) => {
  return new Promise((resolve, reject) => {
    svg2png(svg)
      .then((buffer) => {
        fs.writeFile(filename, buffer, (err) => {
          if (err) reject(err);
          else {
            console.log("File created and saved successfully.");
            resolve(filename);
          }
        });
      })
      .catch((err) => {
        console.error("Error with Conversion: ", err.message);
        reject(err);
      });
  });
};
