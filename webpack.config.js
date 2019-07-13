const path = require('path'); //native node.js function

module.exports = {
  mode: 'production',
  entry: {
    App: "./app/assets/scripts/app.js",
    Vendor: "./app/assets/scripts/Vendor.js"
  },
  output: {
    path: path.resolve(__dirname, "app/temp/scripts"), //generates an absolute path
    filename: "[name]-compiled.js"
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
}
