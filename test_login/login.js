var webdriver = require('selenium-webdriver'),
    test = require('selenium-webdriver/testing'),
    until = webdriver.until,
    By = webdriver.By;

describe('Google Search', function() {
  var driver;

  before(function() {
    driver = new webdriver.Builder().forBrowser("chrome").build();
    //driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
  });

  it('opening page and data entry', function() {
    driver.get('http://localhost/litecart/admin/');
    driver.findElement(By.name('username')).sendKeys('admin');
    driver.findElement(By.name('password')).sendKeys('admin');
	  driver.findElement(By.name('login')).click();
    //driver.wait(until.titleIs('webDriver - поиск в гугле'), 1000);
  });

  after(function() {
    driver.quit();
  });
  
  //setTimeout(function () {driver.quit()}, 3500)
});