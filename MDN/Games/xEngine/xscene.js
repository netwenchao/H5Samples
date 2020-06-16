(function(win) {
    var scene = win.Scene = function(arg) {
        arg = arg || {};
        this.name = arg.name || ("Unnamed_" + (++scene.SID));
        this.namedRenderObj = {};
        this.renderObjs = [];
        this.listeners = [];
        this.x = arg.x || 0;
        this.y = arg.y || 0;
        this.w = arg.w || 480;
        this.h = arg.h || 320;
        this.color = arg.color || "#000000";
        this.holder = document.createElement("div");
        this.holder.setAttribute("id", this.name);
        domUtil.css(this.holder, {
            "position": "absolute",
            "overflow": "hidden",
            "left": 0,
            "top": 0
        });
        this.cav = document.createElement("canvas");
        this.cav.setAttribute("id", "cav" + this.name);
        this.ctx = this.cav.getContext("2d");
        domUtil.css(this.cav, {
            "position": "absolute",
            "zIndex": -1,
            "left": 0,
            "top": 0
        });
        this.setPos();
        this.setSize();
        this.setColor(this.color);
        this.holder.appendChild(this.cav);
        document.body.appendChild(this.holder);
    };
    scene.SID = 0;
    scene.prototype.setPos = function(x, y) {
        this.x = x || this.x;
        this.y = y || this.y;
        domUtil.css(this.holder, {
            "left": this.x,
            "top": this.y
        });
    };
    scene.prototype.setSize = function(w, h) {
        this.w = w || this.w;
        this.h = h || this.h;
        domUtil.css(this.holder, {
            "width": this.w,
            "height": this.h
        });

        domUtil.attr(this.cav, {
            "width": this.w,
            "height": this.h
        });
    };
    scene.prototype.setColor = function(color) {
        this.color = color || this.color;
        domUtil.css(this.holder, {
            backgroundColor: this.color
        });
    };

    scene.prototype.update = function() {
        for (var i in this.renderObjs) {
            this.renderObjs[i].update();
        }
        this.removeAllRemoved();
    };
    scene.prototype.render = function() {
        for (var i in this.listeners) {
            this.listeners[i].enable && this.listeners[i].onBeforeRender();
        }

        this.renderRObj();

        for (var i in this.listeners) {
            this.listeners[i].enable && this.listeners[i].onAfterRender();
        }
    };
    scene.prototype.renderRObj = function() {
        this.clear();
        for (var i in this.renderObjs) {
            this.ctx.save();
            this.renderObjs[i].isVisible && this.renderObjs[i].render(this.ctx);
            this.ctx.restore();
        }
    };
    scene.prototype.clear = function() {
        this.ctx.clearRect(0, 0, this.w, this.h);
    };
    scene.prototype.show = function() {
        domUtil.css(this.holder, {
            "display": "inline-block"
        });
    };
    scene.prototype.hide = function() {
        domUtil.css(this.holder, {
            "display": "hide"
        });
    };
    scene.prototype.fadeIn = function() {

    };
    scene.prototype.fadeOut = function() {

    };
    scene.prototype.clean = function() {
        this.cav.remove();
        this.holder.remove();
        this.cav = null;
        this.holder = null;
        this.ctx = null;
    };
    scene.prototype.setBgImg = function(imgUrl, pattern) {
        domUtil.css(this.holder, pattern == 0 ? {
            "backgroundImage": "url(" + imgUrl + ")",
            "backgroundRepeat": "no-repeat",
            "backgroundPosition": "center",
        } : {
            "backgroundImage": "url(" + imgUrl + ")",
            "backgroundSize": this.w + "px " + this.h + "px"
        });
    };
    scene.prototype.addRObj = function(rObj) {
        rObj.owner = this;
        this.renderObjs.push(rObj);
        this.namedRenderObj[rObj.name] = rObj;
    }
    scene.prototype.createRobj = function(args) {
        var robj = new RenderObj(args);
        this.addRObj(robj);
        return robj;
    };
    scene.prototype.removeRObjByName = function(name) {
        this.namedRenderObj[name] && (this.namedRenderObj[name].canRemove = true || true)
    };
    scene.prototype.removeAllRemoved = function() {
        for (var i in this.renderObjs) {
            if (this.renderObjs[i].canRemove) {
                delete this.namedRenderObj[i];
                this.renderObjs.splice(i, 1);
            }
        }
    };

    scene.prototype.getRObjByName = function(name) {
        return this.namedRenderObj[name];
    };
    scene.prototype.clearRObj = function() {
        this.renderObjs.length = 0;
        this.namedRenderObj = {};
    };

    scene.prototype.addListener = function(ls) {
        this.listeners.push(ls);
    };

    scene.prototype.clearListener = function() {
        this.listeners.length = 0;
    };
})(window);