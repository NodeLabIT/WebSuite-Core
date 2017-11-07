'use strict';

class GeneralConfiguration {

    static listen() {
        WebSuite.getWebSocketHandler().registerCpEvent('cp-general-configuration', (socket, data) => {
            FileUtil.readFile(_dir + '/data/page.json').then(content => {
                WebSuite.getWebSocketHandler().sendToClient(socket, 'cp-general-configuration', JSON.parse(content));
            }).catch(err => {
                console.log(err);
            });
        });

        WebSuite.getWebSocketHandler().registerCpEvent('cp-save-general-configuration', (socket, data) => {
            if(data.title && data.subtitle && data.description && data.keywords && data.footerScript) {
                FileUtil.saveFile(_dir + '/data/page.json', JSON.stringify(data, null, 2)).then(() => {
                    console.log("success");
                }).catch(err => {
                    console.log(err);
                });
            }
        });
    }

}

module.exports = GeneralConfiguration;