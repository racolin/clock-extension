document.addEventListener("DOMContentLoaded", function() {
    var save = document.getElementById("save");
    save.addEventListener("click", function() {
        chrome.tabs.getSelected(null, function(tab) {
            alert("CCc");
        })
    });
});