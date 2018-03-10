var url = require("system").args[1];

var page = require("webpage").create();
page.open(url, function(status) {
    setInterval(function() {
        var rendered = page.evaluate(function() {
            return document.rendered;
        });
        if(rendered) {
            console.log(page.content);
            phantom.exit();
        }
    }, 100);

    setTimeout(function() {
        phantom.exit();
    }, 15000);
});