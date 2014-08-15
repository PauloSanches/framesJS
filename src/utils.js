/**
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} dest
 * @param {Object} src
 * @param {Boolean} [merge]
 * @returns {Object} dest
 */
function extend(dest, src, merge) {
  var keys = Object.keys(src);
  for (var i = 0, len = keys.length; i < len; i++) {
    if (!merge || (merge && dest[keys[i]] === undefined)) {
      dest[keys[i]] = src[keys[i]];
    }
  }
  return dest;
}

/**
 * merge the values from src in the dest.
 * means that properties that exist in dest will not be overwritten by src
 * @param {Object} dest
 * @param {Object} src
 * @returns {Object} dest
 */
function merge(dest, src) {
  return extend(dest, src, true);
}

/**
 * create dom element from settings
 * @param {String} id
 * @param {Object} config
 * @returns {DomElement} element
 */
function createElement(id, config) {
  var element = document.createElement('div');

  element.setAttribute('id', id);

  element.style.width = config.tileWidth + 'px';
  element.style.height = config.tileHeight + 'px';
  element.style.backgroundRepeat = 'no-repeat';
  element.style.overflow = 'hidden';

  return element;
}
