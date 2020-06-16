(function(win) {
    var _frames = win.Frames = function(name, img, duration) {
        this.name = name;
        this.img = img;
        this.duration = duration || 50;
        this.frames = [];
    };
    _frames.prototype.addFrame = function(x, y, w, h, img, dur) {
        this.frames.push([img || this.img, x, y, w, h, dur || this.duration]);
    };
    _frames.prototype.insert = function(idx, x, y, w, h, img, dur) {

    };
    _frames.prototype.clear = function() {
        this.frames = [];
    };
    _frames.prototype.remove = function(idx) {
        this.frames.splice(idx, 1);
    };
    _frames.prototype.get = function(idx) {
        return this.frames[idx];
    };
    _frames.prototype.getCount = function() {
        return this.frames.length;
    };

    var _animation = win.Animations = function() {
        this.anims = {};
        this.add = function(name, frames) {
            this.anims[name] = frames;
        };
        this.remove = function(name) {
            delete this.anims[name];
        };
        this.clear = function() {
            this.anims = {};
        };
        this.get = function(name) {
            return this.anims[name];
        }
    };

    var _frameCtrl = win.FrameCtrl = function(fProcessFrame) {
        this.frameDur = 0;
        var defProcessFrame = function() {
            this.frameDur += FrameState.elapsedTime * this.speed;
            if (this.frameDur >= this.currFrames.frames[this.currFIdx][5]) {
                this.frameDur = 0;
                if (this.currFIdx < this.feIdx - 1) {
                    this.currFIdx++;
                } else {
                    if (this.isCycle) {
                        this.currFIdx = this.fsIdx;
                    }
                }
            }
        };

        this.processFrame = fProcessFrame || defProcessFrame;
        this.reset = function() {
            //开始帧索引
            this.fsIdx = 0;
            //结束帧索引
            this.feIdx = this.currFrames.getCount();
            //当前帧索引
            this.currFIdx = 0;
            //是否循环
            this.isCycle = true;
            //当前帧持续时间
            this.fDur = 0;
            //动画速度
            this.speed = 1;
        };
        this.setCurrent = function(name) {
            var anim = this.anims.get(name);
            if (anim != this.currFrames) {
                var oSpeed = this.speed || 1;
                //当前帧集合
                this.currFrames = anim;
                this.reset();
                this.speed = oSpeed;
            }
        };
        this.getCurrent = function() {
            return this.currFrames;
        };
        this.setAnims = function(anims, curAnimName) {
            this.anims = anims;
            curAnimName = curAnimName || "def";
            this.setCurrent(curAnimName);
        };
        this.getCurrentFrameIdx = function() {
            return this.currFIdx;
        };
        this.getCurrentFrame = function() {
            return this.currFrames[this.currFIdx];
        };
        this.getNextFrame = function() {
            this.processFrame();
            return this.currFrames.get(this.currFIdx);
        };
    };
})(window);