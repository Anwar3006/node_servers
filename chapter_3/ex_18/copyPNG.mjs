import fs from "fs";
import convertToPNG from "./convertToPNG.mjs";
import generatePieChart from "./generatePieSVG.mjs";

// Example PNG image data (replace this with your actual image data)
let pngData = "";
convertToPNG(generatePieChart([1, 2, 3, 5])).then((data) => {
  pngData += data;
});

const pngImageData = Buffer.from(pngData, "base64");

// Specify the file path where you want to save the PNG image
const filePath = "1235.png";

// Create a writable stream to write the image data to the file
const writeStream = fs.createWriteStream(filePath);

// Write the image data to the file
writeStream.write(pngImageData);

// Close the writable stream to ensure all data is flushed and the file is properly closed
writeStream.end();

// Listen for the 'finish' event to know when the writing process is complete
writeStream.on("finish", () => {
  console.log("PNG image has been written to the file successfully.");
});

// Listen for any errors that occur during the writing process
writeStream.on("error", (error) => {
  console.error("Error writing PNG image to file:", error);
});
