var webdriver = require('selenium-webdriver');

var By = webdriver.By,
    until = webdriver.until;

class mainPage {

    constructor(driver) {
        this.driver = driver;
    }

    open() {
        this.driver.get("http://localhost/litecart");
    }

    chooseFirstItem(){
        this.driver.findElement(By.css("#box-most-popular .product:nth-child(1) a.link")).click();
    }
}

exports.mainPage = mainPage;
