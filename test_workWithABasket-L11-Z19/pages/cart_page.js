var webdriver = require('selenium-webdriver');

var By = webdriver.By,
    until = webdriver.until;

class cartPage {

    constructor(driver) {
        this.driver = driver;
    }
}

exports.cartPage = cartPage;