const path = require("path");

module.exports = {
  entry: "./src/index.js", // The entry point for your JavaScript code
  mode: "development",
  output: {
    filename: "bundle-v9.js", // The name of the compiled output file
    path: path.resolve(__dirname, "dist"), // The output directory
  },
};
