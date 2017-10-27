"use strict";

if (typeof Promise === "undefined") {
  // Rejection tracking prevents a common issue where React gets into an
  // inconsistent state due to an error, but it gets swallowed by a Promise,
  // and the user has no idea what causes React's erratic future behavior.
  require("promise/lib/rejection-tracking").enable();
  window.Promise = require("promise/lib/es6-extensions.js");
}

// fetch() polyfill for making API calls.
require("whatwg-fetch");

// For jest env
if (typeof requestAnimationFrame === 'undefined') {
  global.requestAnimationFrame = function(callback) {
    setTimeout(callback, 0);
  };
}

// For development and jest env
if (process.env.NODE_ENV !== 'production') {
  require('babel-polyfill');
}
