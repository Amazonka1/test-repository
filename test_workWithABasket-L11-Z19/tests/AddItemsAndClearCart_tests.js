var target = require('../app/application'),
    test = require('selenium-webdriver/testing');

test.describe('Litecart', function() {
    var app;

    test.before(function() {
        app = new target.Application();
    });
    
    test.it('add product cart', function() {
        app.mainPage.open();
        for(var i=0; i<3; i++){
            app.mainPage.chooseFirstItem();
            app.itemPage.addItemToCart();
            app.itemPage.open();
        }
    });

    test.after(function() {
        app.quit();
    });
});
