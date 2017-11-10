module.exports = function (config) {
  const jqueryFile = process.env.USE_OLD_JQUERY === 'true' ? 'js/tests/vendor/jquery-1.9.1.min.js' : 'assets/js/vendor/jquery-slim.min.js'

  // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
  const browsers = ['ChromeHeadless', 'FirefoxHeadless']
  // if we run our test on Travis we just use ChromeHeadless because Firefox isn't well supported
  if (typeof process.env.TRAVIS_JOB_ID !== 'undefined') {
    browsers.pop()
  }

  config.set({
    frameworks: ['qunit'],
    plugins: ['karma-chrome-launcher', 'karma-firefox-launcher', 'karma-qunit'],
    // list of files / patterns to load in the browser
    files: [
      jqueryFile,
      'assets/js/vendor/popper.min.js',
      'js/dist/util.js',
      'js/dist/tooltip.js',
      'js/dist/!(util|index|tooltip).js', // include all of our js/dist files except util.js, index.js and tooltip.js
      'js/tests/unit/*.js'
    ],
    reporters: ['dots'],
    port: 9876,
    colors: true,
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_ERROR || config.LOG_WARN,
    autoWatch: false,
    browsers,
    customLaunchers: {
      FirefoxHeadless: {
        base: 'Firefox',
        flags: ['-headless'],
      },
    },
    singleRun: true,
    concurrency: Infinity
  })
}
