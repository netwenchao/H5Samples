(function(win) {
    var _FState = win.FrameState = {
        maxFrame: 0,
        minFrame: 9999,
        currentFrame: 0,
        currentTime: 0,
        elapseTime: 0,
        sTime: 0,
        sFrames: 0,
        start: function() {
            this.currentTime = this.sTime = new Date().valueOf();
        },
        update: function() {
            var cur = new Date().valueOf();
            if ((cur - this.sTime) >= 1000) {
                this.currentFrame = this.sFrames;
                this.maxFrame = Math.max(this.maxFrame, this.currentFrame);
                this.minFrame = Math.min(this.minFrame, this.currentFrame);
                this.sFrames = 0;
                this.sTime = cur;
            } else {
                ++this.sFrames;
            }
            this.elapseTime = cur - this.currentTime;
            this.currentTime = cur;
        }
    };

    var _game = win.Game = Class.extend({
        tHandler: null,
        paused: false,
        listenners: [],
        addEventListenner: function(ls) {
            this.listenners.push(ls);
        },
        clearEventListenner: function() {
            this.listenners.length = 0;
        },
        init: function() {
            this.paused = false;
            this.sceneManager = new SceneManager();
        },
        mainLoop: function() {
            for (var i = 0; i < this.listenners.length; i++) {
                this.listenners[i].enable && this.listenners[i].onBeforeRender();
            }
            var sc = this.sceneManager.getCurrentScene();
            if (sc) {
                sc.update();
                sc.render();
            }
            for (var i = 0; i < this.listenners.length; i++) {
                this.listenners[i].enable && this.listenners[i].onAfterRender();
            }
        },
        pause: function() {
            this.paused = true;
        },
        stop: function() {
            clearInterval(this.tHandler);
        },
        run: function(fps) {
            fps = fps || 60;
            var self = this,
                spf = (1000 / fps) | 0;
            FrameState.start();
            self.tHandler = setInterval(function() {
                FrameState.update();
                if (!self.paused) {
                    self.mainLoop();
                }
            }, spf);
        }
    });

    var _appEventListenner = win.AppEventListenner = Class.extend({
        init: function(opt) {
            this.enable = true;
            this.onBeforeRender = opt["onBeforeRender"] || this.onBeforeRender;
            this.onAfterRender = opt["onAfterRender"] || this.onAfterRender;
        },
        onBeforeRender: function() {
            return true;
        },
        onAfterRender: function() {
            return true;
        }
    });

    var _scene = win.Scene = Class.extend({
        init: function(arg) {
            arg = arg || {};
            this.name = arg.name || ("Unnames_") + (++_scene.SID);
            this.x = arg.x || 0;
            this.y = arg.y || 0;
            this.w = arg.w || 480;
            this.h = arg.h || 320;
            this.color = arg.color || "#000000";
            this.hoder = document.createElement("div");
            this.hoder.setAttribute("id", this.name);
            this.hoder.style.position = "absolute";
            this.cav = document.createElement("canvas");
            this.cav.setAttribute("id", "cav_" + this.name);
            this.cav.style.position = "absolute;";
            this.ctx = this.cav.getContext("2d");
            this.setPos();
            this.setSize();
            this.setColor(this.color);
            this.hoder.appendChild(this.cav);
            document.body.appendChild(this.hoder);

            this.namedRenderObj = {};
            this.rObjs = [];
            this.events = [];
        },
        createRObj: function(fn, args) {
            var obj = fn(args);
            this.addRObj(obj);
            return obj;
        },
        addRObj: function(rObj) {
            rObj.owner = this;
            this.rObjs.push(rObj);
            this.namedRenderObj[rObj.name] = rObj;
        },
        removeRobjByName: function(name) {
            this.namedRenderObj[rObj.name] && (this.namedRenderObj[rObj.name].canRemove = true || true)
        },
        removeAllCanRemove: function() {
            for (var i = 0; i < this.rObjs.length; i++) {
                var o = this.rObjs[i];
                if (o.canRemove) {
                    delete this.namedRenderObj[package.name];
                    this.rObjs.splice(i, 1);
                }
            }
        },
        getObjByName: function(name) {
            return this.namedRenderObj[name];
        },
        addEventListenner: function(eve) {
            this.events.push(eve);
        },
        clearEventListenner: function() {
            this.events.length = 0;
        },
        clearRobj: function() {
            this.rObjs.length = 0
            this.namedRenderObj = [];
        },
        setPos: function(x, y) {
            this.x = x || this.x;
            this.y = y || this.y;
            this.hoder.style.left = this.x;
            this.hoder.style.top = this.y;
        },
        setSize: function(w, h) {
            this.w = w || this.w;
            this.h = h || this.h;
            this.hoder.style.width = this.w;
            this.hoder.style.height = this.h;
            this.cav.setAttribute("width", this.w);
            this.cav.setAttribute("height", this.h);
        },
        setColor: function(color) {
            this.color = color || this.color;
            this.hoder.style.backgroundColor = this.color;
        },
        setIndex: function(idx) {
            this.hoder.style.zIndex = idx || 0;
        },
        update: function() {
            for (var i in this.rObjs) {
                this.rObjs[i].update();
            }
            this.removeAllCanRemove();
        },
        render: function() {
            this.clear();
            for (var i in this.events) {
                this.events[i].onBeforeRender();
            }
            this.renderRObjs();
            for (var i in this.events) {
                this.events[i].onAfterRender();
            }
        },
        renderRObjs: function() {
            for (var i in this.rObjs) {
                this.ctx.save();
                this.rObjs[i].render();
                this.ctx.restore();
            }
        },
        clear: function() {
            this.ctx.clearRect(0, 0, this.width, this.height);
        },
        clean: function() {
            this.cav.remove();
            this.hoder.remove();
        },
        show: function() {
            this.hoder.style.display = "block";
        },
        hide: function() {
            this.hoder.style.display = "none";
        }
    });
    _scene.SID = 0;

    var _sceneMgr = win.SceneManager = Class.extend({
        init: function(param) {
            this.namedScene = {};
            this.scenes = [];
        },
        createScene: function(args) {
            var sc = new Scene(args);
            this.scenes.push(sc);
            return sc;
        },
        sortScene: function() {
            for (var i = 0; i < this.scenes.length; i++) {
                this.scenes[i].setIndex(i);
            }
        },
        push: function(sc) {
            this.scenes.push(sc);
            this.namedScene[sc.name] = sc;
        },
        pop: function() {
            var sc = this.scenes.pop();
            if (sc != null) {
                sc.clean();
                delete this.namedScene[sc.name];
                this.sortScene();
            }
        },
        remove: function(name) {
            var sc = this.getSceme(name);
            if (sc != null) {
                sc.clean();
                delete this.namedScene[sc.name];
                ArrayUtil.remove(this.scenes, function(s) {
                    return s.name == name;
                });
                this.sortScene();
            }
        },
        swap: function(from, to) {
            if (from >= 0 && from <= this.scenes.length - 1 && to >= 0 && to <= this.scenes.length - 1 && from != to) {
                var sc = this.scenes[from];
                this.scenes[from] = this.scenes[to];
                this.scenes[to] = sc;
                this.sortScene();
            }
        },
        getIndex: function(sc) {
            return sc.style.zIndex || 0;
        },
        bringToTop: function(sc) {
            var zIdx = this.getIndex(sc);
            if (zIdx != (this.scenes.length - 1)) {
                this.scenes.splice(zIdx, 1);
                this.scenes.push(sc);
                this.sortScene();
            }
        },
        bringToLast: function(sc) {
            var zIdx = this.getIndex(sc);
            if (zIdx != (this.scenes.length - 1)) {
                this.scenes.splice(zIdx, 1);
                this.scenes.unshift(sc);
                this.sortScene();
            }
        },
        back: function(sc) {
            var idx = this.getIndex(sc);
            if (idx > 0) {
                this.swap(idx, idx - 1);
                this.sortScene();
            }
        },
        foward: function(sc) {
            var idx = this.getIndex(sc);
            if (idx < this.scenes.left - 1) {
                this.swap(idx, idx + 1);
                this.sortScene();
            }
        },
        getSceme: function(name) {
            return this.namedScene[name];
        },
        getCurrentScene: function() {
            return this.scenes[this.scenes.length - 1];
        },
        clearAll: function() {
            for (var i in this.scenes) {
                this.scenes[i].clean();
            }
            this.namedScene = {};
            this.scenes.length = 0;
        }
    });

    var _renderObj = win.RenderObj = Class.extend({
        init: function(args) {
            this.name = args.name || "Unnamed_" + (++_renderObj.SID);
            this.x = args.x || 0;
            this.y = args.y || 0;
            this.w = args.w || 0;
            this.h = args.h || 0;

            this.speedX = args.speedX || 0;
            this.speedY = args.speedY || 0;

            this.vX = args.vX || 0;
            this.vY = args.vY || 0;

            this.deg = args.deg || 0;
            this.zIdx = args.zIdx || 0;
            this.isVisible = true;
            this.canRemove = false;
        },
        moveTo: function(x, y) {
            this.x = x || this.x;
            this.y = y || this.y;
        },
        move: function(xOff, yOff) {
            this.x -= (xOff || 0);
            this.y -= (yOff || 0);
        },
        moveStep: function() {
            this.speedX += this.vX;
            this.speedY = this.vY;
            this.x += this.speedX;
            this.y += this.speedY;
        },
        rotate: function(deg) {
            this.deg = deg || 0;
        },
        update: function() {
            this.moveStep();
        },
        render: function(ctx) {
            return;
        }
    });
    _renderObj.SID = 0;
    _renderObj.ClassName = "RenderObj";

    //ball
    var _ball = win.Ball = RenderObj.extend({
        init: function(name, r) {
            this.r = r || 10;
            this._super({ name: name, color: "white" });
        },
        render: function(ctx) {
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fill();
        },
        update: function() {
            var w = this.owner.w,
                h = this.owner.h;
            if (this.x < this.r || this.x > w - this.r) {
                this.speedX = -1 * this.speedX;
            }

            if (this.y < this.r || this.y > h - this.r) {
                this.speedY = -1 * this.speedY
            }
            this._super();
        }
    });

})(window);