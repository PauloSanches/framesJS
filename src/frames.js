function FramesJS(id, options) {

  this.id = id || 'FramesJS';
  this.version = FramesJS.VERSION;
  this.options = merge(options || {}, FramesJS.defaults);

  var preloader = new snch.PreloaderJS(this.options.sprites, this.setup.bind(this));
}

/**
 * @const {object}
 */
FramesJS.defaults = {
  parent: document.body,
  fps: 60,
  tileWidth: 640,
  tileHeight: 400,
  autoplay: false,
  loop: false,
  reverse: false,
  onComplete: function() {}
};

/**
 * @const {string}
 */
FramesJS.VERSION = '{{PKG_VERSION}}';

FramesJS.prototype = {
  constructor: FramesJS,
  setup: function setup(dependencies) {
    this.engine = new Engine(this.id, this.options, dependencies);
    document.body.appendChild(this.engine.container);
  },
  start: function start() {
    this.engine.start();
  },
  stop: function stop() {
    this.engine.stop();
  }
};
