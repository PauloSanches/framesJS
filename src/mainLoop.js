(function(window, snch) {
  'use strict';

  function MainLoopJS(id, fps, callback) {
    this.id = id;
    this.fps = fps;
    this.callback = callback;
    this.active = false;

    this.setup();
  }

  MainLoopJS.prototype = {
    constructor: MainLoopJS,
    setup: function setup() {
      this.now = Date.now();
      this.then = Date.now();
      this.interval = 1000 / this.fps;
      this.delta = 0;
    },
    start: function start() {
      this.active = true;
      this.loop();
    },
    stop: function stop() {
      this.active = false;
      cancelAnimationFrame(this.rfa);
    },
    loop: function loop() {
      this.rfa = requestAnimationFrame(this.loop.bind(this));
      this.now = Date.now();

      this.delta = this.now - this.then;
      if (this.delta > this.interval) {
        this.then = this.now - (this.delta % this.interval);
        this.callback();
      }
    }
  };

  snch.MainLoopJS = MainLoopJS;
}(window, window.snch = window.snch || {}));
// Polyfill for Function.prototype.bind
Function.prototype.bind = (function() {}).bind || function(b) {
  if (typeof this !== "function") {
    throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
  }

  function c() {}
  var a = [].slice,
    f = a.call(arguments, 1),
    e = this,
    d = function() {
      return e.apply(this instanceof c ? this : b || window, f.concat(a.call(arguments)));
    };
  c.prototype = this.prototype;
  d.prototype = new c();
  return d;
};
