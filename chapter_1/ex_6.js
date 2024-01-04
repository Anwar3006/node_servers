// Reading data from a file (input stream) and writing the processed data to another file (output stream).
const fs = require("fs");
const path = require("path");
const os = require("os");

const processData = (outputFilePath) => {
  try {
    // //if files do not exist, create them
    // const inputPath = path.join(__dirname + "/readFrom.txt");
    const outputPath = path.join(__dirname + "/writeTo.txt");
    // if (!fs.existsSync(inputPath)) {
    //   fs.writeFileSync(inputPath, "", "utf-8");
    //   console.log("Input File Created!");
    // }
    if (!fs.existsSync(outputPath)) {
      fs.writeFileSync(outputPath, "", "utf-8");
      console.log("Output File Created!");
    }

    //take input from stdin and write to file
    const inputStream = process.stdin;
    const outputStream = fs.createWriteStream(outputPath, {
      flags: "w",
      mode: 0o666,
    });

    //when input file gets data, write process it and write it to output file
    inputStream.on("data", (chunk) => {
      outputStream.write(chunk.toString().toUpperCase());
    });

    //when input file ends, close the output file
    inputStream.on("end", () => {
      outputStream.end();
      console.log("Data written to " + outputFilePath);
    });

    //manage errors
    inputStream.on("error", (error) => {
      throw new Error("Input stream error: " + error.message);
    });
    outputStream.on("error", (error) => {
      throw new Error("Output stream error: " + error.message);
    });
  } catch (error) {
    return console.error(error);
  }
};

const readFrom = "input.txt";
const writeTo = "output.txt";
processData(readFrom, writeTo);
