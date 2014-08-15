(function(window, snch) {
  'use strict';

  function PreloaderJS(dependencies, callback) {
    this.queue = dependencies;
    this.onComplete = callback;
    this.setup();
  }

  PreloaderJS.prototype = {
    constructor: PreloaderJS,
    setup: function init() {
      this.dependenciesLoaded = [];
      this.indiceLoaded = 0;

      this.load();
    },
    load: function load() {
      var img = new Image(),
        ref = this;

      img.src = this.queue[this.indiceLoaded];
      img.onload = function() {
        ref.done(img);
      };
    },
    done: function done(img) {
      this.indiceLoaded += 1;
      this.dependenciesLoaded.push(img);
      if (this.indiceLoaded < this.queue.length) {
        this.load();
      } else {
        this.onComplete(this.dependenciesLoaded);
      }
    }
  };

  snch.PreloaderJS = PreloaderJS;
})(window, window.snch = window.snch || {});
