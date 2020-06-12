(function(win) {
    var _frameState = win.FrameState = {
        maxFrame: 0,
        minFrame: 9999,
        currentFrame: 0,
        currentTime: 0,
        elapsedTime: 0,
        sFrames: 0,
        sTime: 0,
        start: function() {
            this.sTime = this.currentTime = new Date().valueOf();
        },
        update: function() {
            var now = new Date().valueOf();
            if (now - this.sTime >= 1000) {
                this.currentFrame = this.sFrames;
                this.maxFrame = Math.max(this.currentFrame, this.maxFrame);
                this.minFrame = Math.min(this.currentFrame, this.minFrame);
                this.sFrames = 0;
                this.sTime = now;
            } else {
                ++this.sFrames;
            }
            this.elapsedTime = now - this.currentTime;
            this.currentTime = now;
        }
    };
})(window);