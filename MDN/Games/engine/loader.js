var sprites = [{
    name: "spr_ship1",
    width: 600,
    height: 300,
    x: 1210,
    y: 1610
}];

function resLoader() {
    var res = [];
    this.load = function(src, onloaded, onError) {
        var img = new Image();
        var ix = res.length;
        res[res.length] = img;
        img.onload = function() {
            if (onloaded) onloaded(img, ix, src);
        };
        img.onerror = function() {
            if (onError) onError(src);
        };
        img.src = src;
    };
    this.clear = function() {
        for (var i in res) {
            res[i] = null;
        }
        res = [];
    }
    this.get = function(idx) {
        if (idx >= res.length) return null;
        return res[i];
    }
}

function sprite(name, img, x, y, w, h, sx, sy, sw, sh) {
    var id = name;
    var imgNode = img;
    var pos = {
        x: x,
        y: y
    };
    var size = {
        w: w,
        h: h
    };
    var srec = {
        x: sx,
        y: sy,
        w: sw,
        h: sh
    };

    this.getX = function() {
        return pos.x;
    };

    this.setX = function(x) {
        pos.x = x;;
    };

    this.draw = function(ctx) {
        ctx.drawImage(imgNode, srec.x, srec.y, srec.w, srec.h, pos.x, pos.y, size.w, size.h);
    }
}

function scene(x, y, w, h) {
    var childs = [];
    var scope = this;
    this.draw = function(ctx) {
        for (var i = 0; i < childs.length; i++) {
            childs[i].draw(ctx);
        }
        return scope;
    };

    this.addChild = function(sp) {
        childs.push(sp);
        return scope;
    };
};