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
    await driver.get('http://localhost/litecart/admin/');
    await driver.findElement(By.name('username')).sendKeys('admin');
    await driver.findElement(By.name('password')).sendKeys('admin');
    await driver.findElement(By.name('login')).click();
  });
  
  
  it('test', async function() {
    timeout = 10000;
    locator = By.css('#box-apps-menu li#app-');
    await driver.wait(until.elementLocated(locator), timeout).then(async function() {
    await driver.findElements(locator).then(async function(elements) {
      await elements.forEach(async function(item, i, elements) {
            i++;
                        
            await driver.wait(until.elementLocated(By.css("#box-apps-menu li#app-:nth-child(" + i + ")")), 3000).then(async function() {
              button = driver.findElement(By.id("box-apps-menu")).findElement(By.css("li#app-:nth-child(" + i + ")"));
              button.click();
              button = driver.findElement(By.id("box-apps-menu")).findElement(By.css("li#app-:nth-child(" + i + ")"));
              driver.findElement(By.id("box-apps-menu")).findElements(By.css("ul.docs li")).then(function(docs){
                docs.forEach(function(itemLi, y, docs) {
                    if(docs.length > 0){
                        driver.wait(until.elementLocated(By.css("#box-apps-menu ul.docs li:nth-child(" + j + ")")), 3000).then(function() {  
                          underItems = driver.findElement(By.id("box-apps-menu")).findElement(By.css("ul.docs li:nth-child(" + j + ")"));
                          underItems.click();
                          driver.findElement(By.id("content")).findElement(By.tagName("h1")).then(function(){
                            console.log("Тег H1 найден");
                          });
                          
                        });
                        driver.sleep(300);
                    }else{
                      driver.findElement(By.id("content")).findElement(By.tagName("h1")).then(async function(){
                        console.log("Тег H1 найден");
                      });
                    }  
                });
              });
            });
            driver.sleep(500);
              
          });
        });
    });
  
  
  });

  after(async function() {
    await driver.quit();
  });
  
 //setTimeout(function () {driver.quit()}, 5000)
});