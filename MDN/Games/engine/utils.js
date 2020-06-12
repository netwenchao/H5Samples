var ArrayUtil = {
    remove: function(arr, fn) {
        for (var i in arr) {
            if (fn(arr[i])) {
                arr.splice(i, 1);
            }
        }
    }
};