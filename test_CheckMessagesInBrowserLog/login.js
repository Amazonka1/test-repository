var webdriver = require('selenium-webdriver'),
                test = require('selenium-webdriver/testing'),
                until = webdriver.until,
                By = webdriver.By;

var timeout = 10000;

describe('chrome Search', function() {
  var driver;
  
  before(function() {
    driver = new webdriver.Builder().forBrowser("chrome").build();
    //driver.manage().setTimeouts({implicit: 3000});
  });

  it('opening authorization page and data entry', async function() {
    await driver.get('http://localhost/litecart/admin/?app=catalog&doc=catalog&category_id=1');
    await driver.findElement(By.name('username')).sendKeys('admin');
    await driver.findElement(By.name('password')).sendKeys('admin');
    await driver.findElement(By.name('login')).click();
  });
  
  
  it('test', async function() {
    var locator = By.css(".dataTable tr");
    var link;
    await driver.wait(until.elementLocated(locator), timeout).then(async function() {
      await driver.findElements(locator).then(async function(elements) {
          for(var i=5; i<elements.length; i++){
            await driver.findElement(By.css(".dataTable tr:nth-child(" + i + ") td:nth-child(3) a")).click();
            
            await driver.manage().logs().get("browser").then(async function(logsEntries) {
              await logsEntries.forEach(async function(item, l, logsEntries) {
                  console.log(item);
              });
            });

            await driver.get('http://localhost/litecart/admin/?app=catalog&doc=catalog&category_id=1');
          }
      });
    });
  });

  
  after(async function() {
    await driver.quit();
  });

});