var webdriver = require('selenium-webdriver'),
                test = require('selenium-webdriver/testing'),
                until = webdriver.until,
                By = webdriver.By;

var timeout = 10000;

describe('chrome Search', function() {
  var driver;
  
  before(function() {

    driver = new webdriver.Builder().forBrowser("chrome").build();
    driver.manage().getTimeouts({implicit: 10000});
  });

  it('opening authorization page and data entry', async function() {
    await driver.get('http://localhost/litecart/en/create_account');
  });
  
  
  it('test', async function() {
    var locator = By.css("#create-account tr"), country, zone;
    var email = 'ritascott@ymail.com',
    password = '12345';
    await driver.wait(until.elementLocated(locator), timeout).then(async function() {
      await driver.findElements(locator).then(async function(elements) {
            await driver.findElement(By.css("form[name=customer_form] tr:nth-child(1) td:nth-child(1) input[name=tax_id]")).sendKeys('123');
            await driver.findElement(By.css("form[name=customer_form] tr:nth-child(1) td:nth-child(2) input[name=company]")).sendKeys('selenium');
            await driver.findElement(By.css("form[name=customer_form] tr:nth-child(2) td:nth-child(1) input[name=firstname]")).sendKeys('Rita');
            await driver.findElement(By.css("form[name=customer_form] tr:nth-child(2) td:nth-child(2) input[name=lastname]")).sendKeys('Scott');
            await driver.findElement(By.css("form[name=customer_form] tr:nth-child(3) td:nth-child(1) input[name=address1]")).sendKeys('7 street');
            await driver.findElement(By.css("form[name=customer_form] tr:nth-child(3) td:nth-child(2) input[name=address2]")).sendKeys('9 street');
            await driver.findElement(By.css("form[name=customer_form] tr:nth-child(4) td:nth-child(1) input[name=postcode]")).sendKeys('34657');
            await driver.findElement(By.css("form[name=customer_form] tr:nth-child(4) td:nth-child(2) input[name=city]")).sendKeys('Los Angeles');          
            
            country = await driver.findElement(By.css("form[name=customer_form] tr:nth-child(5) td:nth-child(1) select"));
            await driver.executeScript("arguments[0].selectedIndex = 223; arguments[0].dispatchEvent(new Event('change'))", country);

            zone = await driver.findElement(By.css("form[name=customer_form] tr:nth-child(5) td:nth-child(2) select"));
            zone.isDisplayed().then(function() {
              driver.executeScript("arguments[0].selectedIndex = 11; arguments[0].dispatchEvent(new Event('change'))", zone);
            });
            
            await driver.findElement(By.css("form[name=customer_form] tr:nth-child(6) td:nth-child(1) input[name=email]")).sendKeys(email);
            await driver.findElement(By.css("form[name=customer_form] tr:nth-child(6) td:nth-child(2) input[name=phone]")).sendKeys('+71212112');
            await driver.findElement(By.css("form[name=customer_form] tr:nth-child(8) td:nth-child(1) input[name=password]")).sendKeys(password);
            await driver.findElement(By.css("form[name=customer_form] tr:nth-child(8) td:nth-child(2) input[name=confirmed_password]")).sendKeys(password);
            await driver.findElement(By.css("form[name=customer_form] tr:last-child button[name=create_account]")).click();
          
            //выход из аккаунта
            await driver.findElement(By.css("#box-account li:last-child a")).click();

            //авторизация
            await driver.findElement(By.css("form[name=login_form] input[name=email]")).sendKeys(email);
            await driver.findElement(By.css("form[name=login_form] input[name=password]")).sendKeys(password);
            await driver.findElement(By.css("form[name=login_form] button[name=login]")).click();

            //выход из аккаунта
            await driver.findElement(By.css("#box-account li:last-child a")).click();
  
      });
    });
  });

 

  after(async function() {
    await driver.quit();
  });
});