var webdriver = require('selenium-webdriver'),
                test = require('selenium-webdriver/testing'),
                until = webdriver.until,
                By = webdriver.By;

var timeout = 10000;

describe('chrome Search', function() {
  var driver;
  
  before(function() {

    driver = new webdriver.Builder().forBrowser("chrome").build();
    //driver.manage().getTimeouts({implicit: 10000}); 
  });

  it('opening authorization page and data entry', async function() {
    await driver.get('http://localhost/litecart');
  });
  
  
  it('test', async function() {
    var locator = By.css("#box-most-popular .product");
    var quantityGoods, select, dataTableRow;
    await driver.wait(until.elementLocated(locator), timeout).then(async function() {
      await driver.findElements(locator).then(async function(elements) {

          for(var i=0; i<3; i++){
            quantityGoods = await driver.findElement(By.css("#cart .quantity")).getText();
            quantityGoods = parseInt(quantityGoods) + 1;
            await driver.findElement(By.css("#box-most-popular .product:nth-child(1) a")).click();
            
            select = await driver.executeScript("return $('form[name=buy_now_form] select')");
            if(select.length > 0){
              await selectValue("form[name=buy_now_form] select", 2);
            }

            await driver.findElement(By.css("form[name='buy_now_form'] button[name='add_cart_product']")).click();
            await driver.wait(async function () {
              return driver.findElement(By.css("#cart .quantity")).getText().then(function(text) {
                  return text === quantityGoods.toString();
              });
            }, timeout);
            await driver.get('http://localhost/litecart');
          }
          
          await driver.findElement(By.css("#cart .link")).click();
          
          
          await driver.findElements(By.css(".items li.item")).then(async function(elements) {
              for(var j=elements.length; j>1; j--){
                  await driver.findElement(By.css(".shortcut:nth-child(" + j + ")")).click();
                  dataTableRow = await driver.findElement(By.css(".dataTable tr:nth-child(" + j + ")"));
                  await driver.findElement(By.css("button[name='remove_cart_item']")).click();
                 
                  await driver.wait(until.stalenessOf(dataTableRow), 7000);
              }
              await driver.findElement(By.css("button[name='remove_cart_item']")).click();              
          });
                    
      });
    });
  });

  function selectValue(locator, index){
    var element = driver.findElement(By.css(locator));
    driver.executeScript("arguments[0].selectedIndex = " + index + "; arguments[0].dispatchEvent(new Event('change'))", element);
  }
  after(async function() {
    await driver.quit();
  });

});