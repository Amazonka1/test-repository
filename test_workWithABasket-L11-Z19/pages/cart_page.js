var webdriver = require('selenium-webdriver');

var By = webdriver.By,
    until = webdriver.until;

var dataTableRow;

class cartPage {

    constructor(driver) {
        this.driver = driver;
    }
    clickCart(){
        this.driver.findElement(By.css("#cart .link")).click();
    }

    deleteItems(){
        this.driver.findElements(By.css(".items li.item")).then((elements)=>{
            for(var j=elements.length; j>1; j--){
                this.driver.findElement(By.css(".shortcut:nth-child(" + j + ")")).click();
                dataTableRow = this.driver.findElement(By.css(".dataTable tr:nth-child(" + j + ")"));
                this.driver.findElement(By.css("button[name='remove_cart_item']")).click();
                this.driver.wait(until.stalenessOf(dataTableRow), 5000);
            }
            this.driver.findElement(By.css("button[name='remove_cart_item']")).click();
        });
    }

    clearCart(){
        this.clickCart();
        this.deleteItems();
    }
}

exports.cartPage = cartPage;