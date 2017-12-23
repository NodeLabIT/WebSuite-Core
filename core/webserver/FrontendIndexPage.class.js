'use strict';

const handlebars = require('handlebars');

class FrontendIndexPage {

    constructor() {
        handlebars.registerHelper('meta', function(items, options) {
            let out = "";

            for(let i=0, l=items.length; i<l; i++) {
                out = out + "<meta " + options.fn(items[i]) + ">\n";
            }

            return out;
        });

        handlebars.registerHelper('link', function(items, options) {
            let out = "";

            for(let i=0, l=items.length; i<l; i++) {
                out = out + "<link " + options.fn(items[i]) + ">\n";
            }

            return out;
        });

        handlebars.registerHelper('script', function(items, options) {
            let out = "";

            for(let i=0, l=items.length; i<l; i++) {
                out = out + "<script src=\"" + options.fn(items[i]) + "\"></script>\n";
            }

            return out;
        });

        handlebars.registerHelper('if', function(conditional, options) {
            if(conditional) {
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        });
    }

    postInit() {
        this.compileIndexPage();
        WebSuite.getEventHandler().on('general-configuration-changed', () => {
            console.log("general configuration changed. recompiling");
            this.compileIndexPage();
        });
    }

    getIndexPage() {
        return this.compiledIndexPage;
    }

    compileIndexPage() {
        FileUtil.readFile(__dirname + '/index.html').then(content => {
            FileUtil.readFile(_dir + '/data/page.json').then(pageData => {
                pageData = JSON.parse(pageData);
                let template = handlebars.compile(content);

                const data = {
                    /*meta: [
                        {
                            name: "",
                            lang: "",
                            content: ""
                        }
                    ],
                    link: [
                        {
                            href: "",
                            rel: "",
                            type: ""
                        }
                    ],
                    script: [
                        {
                            src: ""
                        }
                    ]*/
                    meta: [],
                    link: [],
                    script: [],
                    title: pageData.title,
                    description: pageData.description,
                    keywords: pageData.keywords,
                    footerScript: pageData.footerScript
                };

                this.compiledIndexPage = template(data);
            }).catch(err => {
                this.compiledIndexPage = undefined;
                console.log(err.message);
            });
        }).catch(err => {
            this.compiledIndexPage = undefined;
            console.log(err.message);
        });
    }

}

module.exports = new FrontendIndexPage();