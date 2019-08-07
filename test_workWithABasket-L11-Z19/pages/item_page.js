var webdriver = require('selenium-webdriver');

var By = webdriver.By,
    until = webdriver.until;

var quantityGoods=0, select, dr;

class itemPage {

    constructor(driver) {
        this.driver = driver;

        //dr = driver;
    }

    /*quantityItems(){
        //this.driver.wait(function () {
            return this.driver.findElement(By.css("#cart .quantity")).getText().then(function(text) {
                //console.log(text);
                return text === quantityGoods.toString();
            });
        //}, 2000);
    }*/
    
    quantity(){
        return this.driver.findElement(By.css("#cart .quantity")).getText().then(function(text){
            return text;
        });
    }

    quantityItems(){
        return this.quantity().then(function(item){
            return item;
        });
    }

    timeItems(){
        this.driver.wait(function () {
            return this.quantityItems().then(function(i){
                quantityGoods = parseInt(i) + 1;
                return i != quantityGoods.toString();
            });
        }, 10000);
    }
    


    addItemToCart() {      
        select = this.driver.executeScript("return $('form[name=buy_now_form] select')");
        if(select.length > 0){
            selectValue("form[name=buy_now_form] select", 2);
        }
        
        this.driver.findElement(By.css("form[name='buy_now_form'] button[name='add_cart_product']")).click();
        this.timeItems();
        //this.driver.get('http://localhost/litecart');
    }

    open() {
        this.driver.get('http://localhost/litecart');
        return this;
    }

}

exports.itemPage = itemPage;

