//reportPageZoomer.init($("#reportContent"));
//reportPageZoomer.scale()
var reportPageZoomer = (function() {
    var DomZoomer = function() {
        var isIE = function() {
            return navigator.userAgent.indexOf("MSIE") > -1;
        };

        var node = null;
        var inited = false;
        var getWrapper = function() {
            var wrapperId = "zoomWrapper";
            var wrapper = null;
            if ((wrapper = $("#" + wrapperId)).size() > 0) {
                return wrapper;
            }

            //width,height,padding-left
            wrapper = $("<div id=\"zoomWrapper\"><div class=\"zoomer\"><div style=\"width:auto;height:auto;\"></div></div></div>");
            var zoomer = wrapper.find(".zoomer");
            if (!isIE()) {
                zoomer.addClass("zoomPNoneIE");
            }
            wrapper.insertBefore(node);
            wrapper.find(">div:eq(0)>div:eq(0)").append(node);
            return wrapper;
        };

        var getZoomCss = (function() {
            return isIE() ? function(r) {
                return {
                    "zoom": (r * 100) + "%"
                };
            } : function(r) {
                return {
                    "transform": "scale(" + r + ")",
                    "-ms-transform": "scale(" + r + ")",
                    "-moz-transform": "scale(" + r + ")",
                    "-webkit-transform": "scale(" + r + ")",
                    "-o-transform": "scale(" + r + ")",
                    "transform-origin": "0 0",
                    "-ms-transform-origin": "0 0",
                    "-webkit-transform-origin": "0 0",
                    "-moz-transform-origin": "0 0",
                    "-o-transform-origin": "0 0"
                };
            };
        })();

        var setScale = function(wrapper, rate) {
            wrapper.find(".zoomer").css(getZoomCss(rate));
            var scared = originSize.scaled(rate);
            wrapper.css(scared);
            var zClientRect = wrapper.find(".zoomer")[0].getBoundingClientRect();
            console.log("ZoomerW:" + zClientRect.width);
            console.log("ScaredW:" + scared.width);
            wrapper.css("margin-left", Math.round((originSize.width - zClientRect.width) / 2));
        };

        var originSize = {
            width: 0,
            height: 0,
            scaled: function(r) {
                return {
                    width: r * this.width,
                    height: r * this.height
                };
            },
            saveToNode: function() {
                node.attr("zoomer_OriginW", this.width);
                node.attr("zoomer_OriginH", this.height);
            },
            refresh: function() {
                originSize.width = node.width();
                originSize.height = node.height();
                this.saveToNode();
            }
        };

        this.init = function(ele) {
            node = $(ele);
        };

        this.scale = function(rate) {
            if (!inited) {
                originSize.refresh();
                inited = true;
            }
            var w = getWrapper();
            var r = parseInt(rate);
            setScale(w, rate / 100);
            if (r < 100) {
                w.removeClass("rate1");
                w.removeClass("rateg1");
            } else if (r > 100) {
                w.removeClass("rate1");
                w.addClass("rateg1");
            } else { //eq 1
                w.addClass("rate1");
                w.removeClass("rateg1");
            }
        };
    };
    return new DomZoomer();
})();