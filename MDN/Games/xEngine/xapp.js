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
})(window);