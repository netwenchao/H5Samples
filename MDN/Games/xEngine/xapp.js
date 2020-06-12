(function(win) {
    var appEventLIstener = win.AppEventListener = function(param) {
        this.enable = true;
        this.onBeforeRender = param["onBeforeRender"] || function() { return true };
        this.onAfterRender = param["onAfterRender"] || function() { return true };
    };

    var game = win.Game = function() {
        var paused = false;
        var tHandler = null;
        var self = this;
        var listeners = [];
        this.sceneManager = new SceneManager();

        this.addListener = function(hdl) {
            listeners.push(hdl);
        };

        this.clearListener = function() {
            listeners.length = 0;
        };

        this.run = function(fps) {
            fps = fps || 60;
            FrameState.start();
            tHandler = setInterval(function() {
                FrameState.update();
                if (!paused) {
                    self.mainloop();
                }
            }, (1000 / fps) | 0);
        };

        this.pause = function() {
            paused = true;
        };
        this.stop = function() {
            this.clearInterval(self.tHandler);
        }

        this.mainloop = function() {
            for (var s in listeners) {
                listeners[s].enable && listeners[s].onBeforeRender();
            }
            //Todo Render
            var sc = this.sceneManager.getCurrentScene();
            sc.update();
            sc.render();
            for (var s in listeners) {
                listeners[s].enable && listeners[s].onAfterRender();
            }
        };
    };

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




    var sceneManager = win.SceneManager = function(param) {
        this.namedScene = {};
        this.scenes = [];
    };
    sceneManager.SID = 0;
    sceneManager.prototype.createScene = function(args) {
        var sc = new Scene(args);
        this.push(sc);
        return sc;
    };
    sceneManager.prototype.sortSceneIdx = function() {
        for (var s in this.scenes) {
            domUtil.css(this.scenes[s].holder, {
                zIndex: s
            });
        }
    };
    sceneManager.prototype.push = function(scene) {
        if (!this.getScene(scene.name)) {
            this.namedScene[scene.name] = scene;
            this.scenes.push(scene);
            this.sortSceneIdx();
        }
    };
    sceneManager.prototype.pop = function() {
        var sc = this.scenes.pop();
        if (sc) {
            sc.clean();
            delete this.scenes[sc.name];
            this.sortSceneIdx();
        }
    };
    sceneManager.prototype.swap = function(from, to) {
        if (from != to && from >= 0 && to >= 0 && from < this.scenes.length && to < this.scenes.length) {
            var tmp = this.scenes[from];
            this.scenes[from] = this.scenes[to];
            this.scenes[to] = tmp;
            this.sortSceneIdx();
        }
    };
    sceneManager.prototype.remove = function(name) {
        var scene = this.namedScene[name];
        if (scene) {
            this.scenes.splice(this.getIdx(scene), 1);
            delete this.namedScene[name];
            this.sortSceneIdx();
        }
    };
    sceneManager.prototype.getIdx = function(scene) {
        return scene.holder.style.zIndex;
    };
    sceneManager.prototype.bringToTop = function(scene) {
        var idx = this.getIdx(scene);
        if (idx != (this.scenes.length - 1)) {
            this.scenes.splice(idx, 1);
            this.push(scene);
            this.sortSceneIdx();
        }
    };
    sceneManager.prototype.bringToLast = function(scene) {
        var idx = this.getIdx(scene);
        if (idx != 0) {
            this.scenes.splice(idx, 1);
            this.unshift(scene);
            this.sortSceneIdx();
        }
    };
    sceneManager.prototype.back = function(scene) {
        var idx = this.getIdx(scene);
        if (idx > 0) {
            this.swap(idx, idx - 1);
        }
    };
    sceneManager.prototype.foward = function(scene) {
        var idx = this.getIdx(scene);
        if (idx < this.scenes.length - 1) {
            this.swap(idx, idx + 1);
        }
    };
    sceneManager.prototype.getScene = function(name) {
        return this.namedScene[name];
    };
    sceneManager.prototype.getCurrentScene = function() {
        return this.scenes[this.scenes.length - 1]
    };
    sceneManager.prototype.clearAll = function() {
        for (var i in this.scenes) {
            this.scenes[i].clean();
        }
        this.scenes.length = 0;
        this.namedScene = {};
    };

    var renderObj = win.RenderObj = function(name) {
        this.name = name || "Unnamed_" + (++renderObj.SID);
        this.owner = null;
        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;
        this.dx = 0;
        this.dy = 0;
        this.vx = 0;
        this.vy = 0;
        this.deg = 0;
        this.zIdx = 0;
        this.isVisible = true;
        this.canRemove = false;
    };
    renderObj.SID = 0;
    renderObj.ClassName = "RenderObj";
    renderObj.prototype.moveTo = function(x, y) {
        this.x = x || this.x;
        this.y = y || this.y;
    };
    renderObj.prototype.move = function(offx, offy) {
        this.x += offx || 0;
        this.y += offy || 0;
    };
    renderObj.prototype.moveStep = function() {
        this.dx += this.vx;
        this.dy += this.vy;
        this.x += this.dx;
        this.y += this.dy;
    };
    renderObj.prototype.remove = function() {
        this.canRemove = true;
    };
    renderObj.prototype.rotate = function(deg) {
        this.deg = deg || this.deg;
    };
    renderObj.prototype.update = function() {
        console.log("RenderObj.update");
        this.moveStep();
    };
    renderObj.prototype.render = function(ctx) {
        console.log("RenderObj.render");
        return;
    };
})(window);