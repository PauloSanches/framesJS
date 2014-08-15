
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
