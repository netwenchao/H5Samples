(function(win) {
    var _imgRes = win.ImageRes = function() {
        this.load = function(name, url, fnLoaded) {
            var img = new Image();
            var imgObj = {
                loaded: false,
                type: "image",
                name: name,
                src: url,
                el: img,
                err: null
            };
            img.onload = function() {
                Object.loaded = true;
                fnLoaded && fnLoaded();
            };
            img.onerror = function() {
                imgObj.err = arguments;
            };
            img.setAttribute("src", url);
            return imgObj;
        }
    };

    var _frameRes = win.FrameRes = function() {
        this.load = function(url, type, fnLoaded) {
            var ctype = "text/xml;charset=UTF-8";
            $.get(url, function(data, status, xhr) {
                fnLoaded(data);
            })
        };
    };

    var _resManager = win.ResManager = function() {
        var resTypes = {};
        var res = {};
        this.regResType = function(type, fn) {
            if (!resTypes[type]) {
                resTypes[type] = fn;
            }
        }
        this.load = function(type, name, src, fnLoaded) {
            var cls = resTypes[type];
            if (cls) {
                var res = new(cls).load(name, src, fnLoaded);
                res[name] = res;
            }
        };
        this.addRes = function(resObj) {
            res[resObj.type] = res[resObj.type] || {};
            res[resObj.type][resObj.name] = res;
        };
        this.removeRes = function(resObj) {
            if (res[resObj.type] && res[resObj.type][resObj.name]) {
                delete res[resObj.type][resObj.name];
            }
        };
        this.clearRes = function() {
            res = {};
        };
        this.getResByName = function(type, name) {
            return res[type] && res[type][name] ? res[type][name] : null;
        };
        this.getAnimationsByName = function(fResName, name) {

        };
        this.loadRes = function(url, loadFn, preLoadedFn) {
            //
        };
    };

})(window);