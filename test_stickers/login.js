var webdriver = require('selenium-webdriver'),
                test = require('selenium-webdriver/testing'),
                until = webdriver.until,
                By = webdriver.By;


describe('chrome Search', function() {
  var driver;

  before(function() {

    driver = new webdriver.Builder().forBrowser("chrome").build();
    //driver.manage().setTimeouts({implicit: 10000});
    driver.manage().getTimeouts({implicit: 10000});
  });

  it('opening authorization page and data entry', async function() {
    await driver.get('http://localhost/litecart/');
  });
  
  
  it('test', async function() {
    timeout = 10000;
    locator = By.css('.image-wrapper');
    await driver.wait(until.elementLocated(locator), timeout).then(function() {
        driver.findElements(locator).then(function(elements) {
          elements.forEach(function(item, i, elements) {
            elements[i].findElement(By.css('.sticker')).getAttribute("class").then(function(attr){              
              if(attr.split(" ").length == 2){
                console.log(attr);
              }else if(attr.split(" ").length < 2){
                console.log("Нет стикера" + attr);
              }else{
                console.log("Стикеров больше чем должно быть у одного товара" + attr);
              }
            });

            
            
          });
        });
    });
  
  
  });

  after(async function() {
    await driver.quit();
  });
  
 //setTimeout(function () {driver.quit()}, 5000)
});