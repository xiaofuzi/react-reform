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
      }
    },
    webpackMiddleware: {
      noInfo: true
    }
  });
};