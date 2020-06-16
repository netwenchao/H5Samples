(function(win) {
    var _sprite = win.Sprite = function(name) {
        RenderObj.call(this, name);
        this.anims = null;
        this.fCtrl = new FrameCtrl();
        this.scaleX = 1;
        this.scaleY = 1;
        this.isXFlip = false;
        this.isYFlip = false;
        this.setAnims = function(animations, currAnimName) {
            this.anims = animations;
            this.fCtrl.setAnims(this.anims, currAnimName || "def");
        };
        this.addAnim = function(name, frames, isCurrent) {
            this.anims.add(name, frames);
            isCurrent && this.fCtrl.setCurrent(name);
        };
        this.removeAnim = function(name) {
            this.anims.remove(name);
        };
        this.setAnimSpeed = function(s) {
            this.fCtrl.speed = s;
        };
        this.getAnim = function(name) {
            return this.anims.get(name);
        };
        this.getCurrentAnim = function() {
            return this.fCtrl.getCurrent();
        };
        this.getCurrentFrame = function() {
            return this.fCtrl.getCurrentFrame();
        };
        this.getNextFrame = function() {
            return this.fCtrl.getNextFrame()
        };
        this.render = function(ctx) {
            ctx.translate(this.x, this.y);
            var cw = this.w * 0.5;
            var ch = this.h * 0.5;
            var scx = this.isXFlip ? -this.scaleX : this.scaleX;
            var scy = this.isYFlip ? -this.scaleY : this.scaleY;
            if (this.deg != 0) {
                ctx.rotate(deg);
            }
            ctx.scale(scx, scy);
            var f = this.fCtrl.getNextFrame();
            ctx.drawImage(f[0], f[1], f[2], f[3], f[4], -cw, -ch, this.w, this.h);
        };
        this.ClassName = "Sprite";
    };
    _sprite.prototype = new RenderObj();
    _sprite.prototype.constructor = _sprite;
})(window);