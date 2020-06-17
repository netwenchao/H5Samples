(function(win) {
    var resUtil = win.ResUtil = (function() {
        var getXhr = function() {
            if (window.XMLHttpRequest)
                return new XMLHttpRequest();
            return ActiveXObject("Microsoft.XMLHTTP")
        };

        this.ajax = function(opt) {
            var xhr = getXhr();
            xhr.open(opt.type, opt.url, opt.sync == null || opt.sync == undefined || opt.sync);
            xhr.onreadystatechange = (function() {
                var req = xhr;
                var options = opt;
                return function() {
                    if (req.readyState == 4) {
                        if (req.state == 200) {
                            options.success && options.success(req.responseText, req);
                            return;
                        }
                        options.error && options.error(req.state);
                    }
                };
            })();
            xhr.send(opt.data || null);
        };
    })();
})(window)