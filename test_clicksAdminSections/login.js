var webdriver = require('selenium-webdriver'),
                test = require('selenium-webdriver/testing'),
                until = webdriver.until,
                By = webdriver.By;

var timeout = 10000;

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
    var locator = By.css('ul#box-apps-menu li#app-'),
    underItems,
    link;

    await driver.wait(until.elementLocated(locator), timeout).then(async function() {
      await driver.findElements(locator).then(async function(elements) {
        for(var i=1; i<=elements.length; i++){
            link = refreshPage(driver, i);            
            await link.click();
            link = refreshPage(driver, i);
            
            
            await driver.findElement(By.id("box-apps-menu")).findElements(By.css("ul.docs li")).then(async function(docs){
              if(docs.length > 0){
                for(var y=1; y<=docs.length; y++){
                  link = refreshPage(driver, i);
                  underItems = link.findElement(By.css("ul.docs li:nth-child(" + y + ")"));
                  await underItems.click();
                  await driver.findElement(By.id("content")).findElement(By.tagName("h1")).then(async function(head){
                    head = await head.getText();
                    console.log("Тег H1 найден " + head);
                  });
                }
              }else{
                await driver.findElement(By.id("content")).findElement(By.tagName("h1")).then(async function(head){
                  head = await head.getText();
                  console.log("Тег H1 найден " + head);
                });
              }
            });
        }
      });
    });
  });

  function refreshPage(wd, i){
    row = wd.findElement(By.id("box-apps-menu"));
    link = row.findElement(By.css("li#app-:nth-child(" + i + ")"));
    return link;
  }

  after(async function() {
    await driver.quit();
  });
  
 //setTimeout(function () {driver.quit()}, 5000)
});