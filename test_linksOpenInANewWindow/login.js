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
    await driver.get('http://localhost/litecart/admin/?app=countries&doc=countries');
    await driver.findElement(By.name('username')).sendKeys('admin');
    await driver.findElement(By.name('password')).sendKeys('admin');
    await driver.findElement(By.name('login')).click();
  });
  
  
  it('test', async function() {
    await driver.findElement(By.css('a.button')).click();
    var locator = By.css("form tr");
    var link;
    await driver.wait(until.elementLocated(locator), timeout).then(async function() {
      await driver.findElements(locator).then(async function(elements) {
          let mainWindow = await driver.getWindowHandle();    
          let oldWindows = await driver.getAllWindowHandles();
          for(var i=1; i<=elements.length; i++){
            link = await driver.executeScript("return $('form tr:nth-child(" + i + ") a[target=_blank]')");
            if(link.length > 0){
              await driver.findElement(By.css("form tr:nth-child(" + i + ") a[target='_blank']")).click();
              let newWindow = await driver.wait(async function () {
                var handles = await driver.getAllWindowHandles();
                handles.splice(handles.indexOf(mainWindow), 1);
                return handles;
              }, timeout);
              await driver.switchTo().window(newWindow.toString());
              await driver.close();
              await driver.switchTo().window(mainWindow);
            }
          }
      });
    });
  });

  
  after(async function() {
    await driver.quit();
  });

});