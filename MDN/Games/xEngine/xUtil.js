var domUtil = {
    css: function(dom, obj) {
        for (var s in obj) {
            if (typeof(obj[s]) == "function") {
                continue;
            }
            dom.style[s] = obj[s];
        }
    },
    attr: function(dom, obj) {
        for (var s in obj) {
            if (typeof(obj[s]) == "function") {
                continue;
            }
            dom.setAttribute(s, obj[s]);
        }
    }
};

var ColorUtil = {
    rgb: function(r, g, b) {
        return "#" + ("0" + r.toString(16)).substr(-2) + ("0" + g.toString(16)).substr(-2) + ("0" + b.toString(16)).substr(-2);
    }
};
var MathUtil = {
    randInt: function(max) {
        return Math.floor(Math.random() * max);
    }
};