var webdriver = require('selenium-webdriver'),
    main_page = require('../pages/main_page'),
    item_page = require('../pages/item_page');
    cart_page = require('../pages/cart_page');

class Application {
    constructor() {
        this.driver = new webdriver.Builder()
            .forBrowser("chrome")
            .build();
        this.mainPage = new main_page.mainPage(this.driver);
        this.itemPage = new item_page.itemPage(this.driver);
        this.cartPage = new cart_page.cartPage(this.driver);
    }

    quit() {
        this.driver.quit();
    }
}

exports.Application = Application;

