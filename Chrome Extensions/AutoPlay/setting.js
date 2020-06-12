document.addEventListener("DOMContentLoaded", function() {
    var playNode = document.getElementById("playerId");
    var autoPlayNode = document.getElementById("autoPlay");
    autoPlayNode.addEventListener("changed", function() {
        chrome.tabs.getSelected(null, function(tab) {
            var doc = document;
        });
    });
});