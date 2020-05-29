var sampleChanger = (function() {
    var dpl = null;
    var funcs = null;
    var scope = {};
    var cav = null;
    scope.init = function(funcObj) {
        funcs = funcObj;
        cav = document.createElement("canvas");
        cav.setAttribute("width", 800);
        cav.setAttribute("height", 800);
        cav.setAttribute("id", "cav");
        cav.style = "display:block;margin-top:16px;";
        dpl = document.createElement("select");
        dpl.setAttribute("id", "funcSelect");
        dpl.style = "padding:4px 8px;";
        var pl = document.createElement("option");
        pl.setAttribute("value", "");
        pl.innerText = "-Please Select-";
        dpl.appendChild(pl);

        document.body.appendChild(dpl);
        document.body.appendChild(cav);

        for (var fn in funcs) {
            if (funcs.hasOwnProperty(fn) && fn.indexOf("_") != 0) {
                var opt = document.createElement("option");
                opt.setAttribute("value", fn);
                opt.innerText = fn;
                dpl.appendChild(opt)
            }
        }
        dpl.onchange = (function(samples) {
            var f = samples;
            var ctx = cav.getContext("2d");
            var cmb = dpl;
            return function() {
                var fn = cmb.value;
                if (fn != "" && funcs.hasOwnProperty(fn)) {
                    ctx.clearRect(0, 0, cav.width, cav.height);
                    funcs[fn].call(ctx);
                } else {
                    ctx.clearRect(0, 0, cav.width, cav.height);
                }
            };
        })(funcs);
    };
    return scope;
})();