(function(win) {

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