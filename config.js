'use strict';

module.exports = {
  dist: './build/',
  output: 'index.js',
  outputMin: 'index.min.js',
  scripts: [
    'src/frames.js',
    'src/preloader.js',
    'src/mainLoop.js'
    ]
};
