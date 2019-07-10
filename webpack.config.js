const path = require('path'); //native node.js function

module.exports = {
  mode: 'production',
  entry: "./app/assets/scripts/app.js",
  output: {
    path: path.resolve(__dirname, "app/temp/scripts"), //generates an absolute path
    filename: "app-compiled.js"
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
}
