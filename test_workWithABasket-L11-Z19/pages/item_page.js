var webdriver = require('selenium-webdriver');

var By = webdriver.By,
    until = webdriver.until;

var quantityGoods, select;

class itemPage {

    constructor(driver) {
        this.driver = driver;
    }

    
    newItemCart(){
        return this.driver.findElement(By.css("#cart .quantity")).getText().then(function(text){
            return text;
        });
    }

    oldItemCart(){
        return this.driver.findElement(By.css("#cart .quantity")).getText().then(function(text){
            quantityGoods = parseInt(text) + 1;
        });
    }

    comparingQuantityGoods(){
        this.driver.wait(()=>{
            return this.newItemCart().then(function(item){
                return item === quantityGoods.toString();
            });
        }, 10000);
    }    
    
    selectOpen(){
        select = this.driver.executeScript("return $('form[name=buy_now_form] select')");
        if(select.length > 0){
            var element = this.driver.findElement(By.css("form[name=buy_now_form] select"));
            this.driver.executeScript("arguments[0].selectedIndex=2; arguments[0].dispatchEvent(new Event('change'))", element);
        }
    }

    addItemToCart() {      
        this.selectOpen();
        this.oldItemCart();
        this.driver.findElement(By.css("form[name='buy_now_form'] button[name='add_cart_product']")).click();
        this.comparingQuantityGoods();
    }

}

exports.itemPage = itemPage;

