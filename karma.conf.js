var path = require("path");

module.exports = function(config) {
  config.set({
    browsers: ["Chrome"],
    singleRun: process.env.CONTINUOUS_INTEGRATION === "true",
    frameworks: ["mocha"],
    files: [
      "src/**/test-*.js"
    ],
    preprocessors: {
      "src/**/test-*.js": ["webpack", "sourcemap"]
    },
    reporters: ["mocha"], //report results in this format
    webpack: {
      devtool: "inline-source-map",
      module: {
        loaders: [
          {test: /\.js$/, loader: "babel-loader"}
        ]
      },
      resolve: {
        alias: {
          "react-reform/opt": path.join(__dirname, "src", "opt"),
          "react-reform": path.join(__dirname, "src", "core")
        }
      }
    },
    webpackMiddleware: {
      noInfo: true
    }
  });
};
