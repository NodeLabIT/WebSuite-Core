var url = require('system').args[1];

var page = require('webpage').create();
page.open(url, function(status) {
    var seconds = 0;
    setInterval(function() {
        var rendered = page.evaluate(function() {
            return document.rendered;
        });
        if(rendered) {
            console.log(page.content);
            phantom.exit();
        } else {
            seconds++;
        }
    }, 1000);

    setTimeout(function() {
        phantom.exit();
    }, 15000);
});