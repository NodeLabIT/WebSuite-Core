const url = require('system').args[1];

console.log("hi");

const page = require('webpage').create();
page.open(url, function() {
    let seconds = 0;
    setInterval(function() {
        console.log(seconds);
        let rendered = page.evaluate(function() {
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
    }, 30000);
});