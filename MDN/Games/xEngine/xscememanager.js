(function(win) {
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
})(window);