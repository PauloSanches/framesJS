(function(window, document, undefined, snch) {
  'use strict';

  function FramesJS(id, options) {
    this.id = id || 'FramesJS';
    this.version = FramesJS.VERSION;
    this.options = merge(options || {}, FramesJS.defaults);

    var preloader = new snch.PreloaderJS(this.options.sprites, this.setup.bind(this));
  }

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

  function parseSpritesSettings(sprites, width, height) {
    var spriteSettings = [],
      i = 0,
      l = sprites.length;

    for (; i < l; i++) {
      var setting = {
        tilesLines: sprites[i].height / height,
        tilesColunms: sprites[i].width / width,
        tiles: (sprites[i].height / height) * (sprites[i].width / width)
      };

      spriteSettings.push(setting);
    }

    return spriteSettings;
  }

  function spriteLoad(url, callback) {
    var img = new Image();
    img.src = url;
    img.onload = function() {
      callback(img);
    };
  }

  function createElement(id, config) {
    var element = document.createElement('div');

    element.setAttribute('id', id);

    element.style.width = config.tileWidth + 'px';
    element.style.height = config.tileHeight + 'px';
    element.style.backgroundRepeat = 'no-repeat';
    element.style.overflow = 'hidden';

    return element;
  }

  function extend(dest, src, merge) {
    var keys = Object.keys(src);
    for (var i = 0, len = keys.length; i < len; i++) {
      if (!merge || (merge && dest[keys[i]] === undefined)) {
        dest[keys[i]] = src[keys[i]];
      }
    }
    return dest;
  }

  function merge(dest, src) {
    return extend(dest, src, true);
  }

  function Engine(id, options, dependencies) {
    this.id = id;
    this.options = options;

    this.setup(dependencies);
  }

  Engine.prototype = {
    constructor: Engine,
    setup: function setup(dependencies) {
      this.container = createElement(this.id, this.options);
      this.spriteSettings = parseSpritesSettings(dependencies, this.options.tileWidth, this.options.tileHeight);
      this.mainLoop = new snch.MainLoopJS(this.id, this.options.fps, this.draw.bind(this));

      this.reversing = false;
      this.tileIndice = 0;
      this.tileLine = 0;
      this.tileColunm = 0;
      this.spriteIndice = 0;
      this.spritesLength = dependencies.length;

      this.setSprite();
      this.setTile();

      if (this.options.autoplay) {
        this.init();
      }
    },
    init: function init() {
      this.start();
    },
    start: function start() {
      if (!this.mainLoop.active) {
        this.mainLoop.start();
      }
    },
    stop: function stop() {
      if (this.mainLoop.active) {
        this.mainLoop.stop();
      }
    },
    draw: function draw() {
      this.foward();
    },
    reset: function reset() {
      this.tileIndice = 0;
      this.spriteIndice = 0;

      this.setTile();
      this.setSprite();
    },
    foward: function foward() {
      this.tileIndice++;
      if (this.tileIndice >= this.spriteSettings[this.spriteIndice].tiles) {
        if (this.spriteIndice >= this.spriteSettings.length - 1) {
          if (this.options.reverse) {
            this.reversing = true;
            return;
          } else {
            if (this.options.loop) {
              this.reset();
            } else {
              this.stop();
              return;
            }
          }
        }

        this.spriteIndice++;
        this.tileIndice = 0;

        this.setSprite();
      } else {
        this.setTile();
      }
    },
    backward: function backward() {},
    setTile: function setTile() {
      var setting = this.spriteSettings[this.spriteIndice],
        x = 0,
        y = 0;

      x = this.tileColunm * this.options.tileWidth;
      y = this.tileLine * this.options.tileHeight;

      if (this.tileColunm >= setting.tilesColunms - 1) {
        this.tileColunm = 0;
        this.tileLine += 1;
      } else {
        this.tileColunm += 1;
      }
      this.container.style.backgroundPosition = -x + 'px ' + -y + 'px';
    },
    setSprite: function setSprite() {
      this.tileColunm = 0;
      this.tileLine = 0;
      this.container.style.backgroundPosition = '0px 0px';
      this.container.style.backgroundImage = 'url(' + this.options.sprites[this.spriteIndice] + ')';
    }
  };

  snch.FramesJS = snch.FramesJS || FramesJS;

}(window, document, undefined, window.snch = window.snch || {}));
