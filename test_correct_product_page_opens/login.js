var webdriver = require('selenium-webdriver'),
                test = require('selenium-webdriver/testing'),
                until = webdriver.until,
                By = webdriver.By;

var timeout = 10000;

describe('chrome Search', function() {
  var driver;
  
  before(function() {

    driver = new webdriver.Builder().forBrowser("chrome").build();
    //driver = new webdriver.Builder().forBrowser('firefox').build();
    //driver = new webdriver.Builder().forBrowser('internet explorer').build();
    //driver.manage().setTimeouts({implicit: 10000});
    driver.manage().getTimeouts({implicit: 10000});
  });

  it('opening authorization page and data entry', async function() {
    await driver.get('http://localhost/litecart/');
  });
  
  
  it('test', async function() {
    var locator = By.css('#box-campaigns .product');
    await driver.wait(until.elementLocated(locator), timeout).then(async function() {
      await driver.findElements(locator).then(async function(elements) {
        var mainProductLink, mainProductName, mainProductOldPrice, mainProductNewPrice, mainProductOldPriceColor, mainProductNewPriceColor, mainProductOldPriceFontSize,
        mainProductNewPriceFontSize, productName, productOldPrice, productNewPrice, productOldPriceColor, productNewPriceColor, productOldPriceFontSize, productNewPriceFontSize;
        for(var i=1; i<=elements.length; i++){
            mainProductLink = await driver.findElement(By.css("#box-campaigns .product:nth-child(" + i + ") a.link")).getAttribute("href");
            mainProductName  = await driver.findElement(By.css("#box-campaigns .product:nth-child(" + i + ") .name")).getText();
            mainProductOldPrice = await driver.findElement(By.css("#box-campaigns .product:nth-child(" + i + ") .regular-price")).getText();
            mainProductNewPrice = await driver.findElement(By.css("#box-campaigns .product:nth-child(" + i + ") .campaign-price")).getText();
            mainProductOldPriceColor = await driver.findElement(By.css("#box-campaigns .product:nth-child(" + i + ") .regular-price")).getCssValue("color");
            mainProductNewPriceColor = await driver.findElement(By.css("#box-campaigns .product:nth-child(" + i + ") .campaign-price")).getCssValue("color");
            mainProductOldPriceFontSize = await driver.findElement(By.css("#box-campaigns .product:nth-child(" + i + ") .regular-price")).getCssValue("font-size");
            mainProductNewPriceFontSize = await driver.findElement(By.css("#box-campaigns .product:nth-child(" + i + ") .campaign-price")).getCssValue("font-size");

            numbersComparison(mainProductOldPriceFontSize, mainProductNewPriceFontSize, "Размеры шрифтов совпадают на главной странице ", "Размеры шрифтов не совпадают на главной странице ");
           
            await driver.get(mainProductLink);
            productName  = await driver.findElement(By.css("#box-product .title")).getText();
            productOldPrice = await driver.findElement(By.css("#box-product .regular-price")).getText();
            productNewPrice = await driver.findElement(By.css("#box-product .campaign-price")).getText();
            productOldPriceColor = await driver.findElement(By.css("#box-product .regular-price")).getCssValue("color");
            productNewPriceColor = await driver.findElement(By.css("#box-product .campaign-price")).getCssValue("color");

            productOldPriceFontSize = await driver.findElement(By.css("#box-product .regular-price")).getCssValue("font-size");
            productNewPriceFontSize = await driver.findElement(By.css("#box-product .campaign-price")).getCssValue("font-size");
            
            stringsComparison(mainProductName, productName, "Названия товаров совпадают ", "Названия товаров не совпадают ");

            numbersComparison(mainProductOldPrice, productOldPrice, "Цены товаров совпадают ", "Цены товаров не совпадают ");
            numbersComparison(mainProductNewPrice, productNewPrice, "Цены товаров совпадают ", "Цены товаров не совпадают ");

            stringsComparison(mainProductOldPriceColor, productOldPriceColor, "Цвета старых цен совпадают ", "Цвета старых цен не совпадают ");
            stringsComparison(mainProductNewPriceColor, productNewPriceColor, "Цвета новых цен совпадают ", "Цвета новых цен не совпадают ");

            numbersComparison(productOldPriceFontSize, productNewPriceFontSize, "Размеры шрифтов совпадают в карточке товара ", "Размеры шрифтов не совпадают в карточке товара ");
            
        }
  
      });
    });
  });

  function stringsComparison(string1, string2, text1, text2){
    if(string1 == string2){
      console.log(text1 + string1 + " " + string2);
    }else{
      console.log(text2 + string1 + " " + string2);
    }
  }


  function numbersComparison(str1, str2, text1, text2){
      number1 = parseInt(str1.match(/\d+/));
      number2 = parseInt(str2.match(/\d+/));
      if(number1 == number2){
        console.log(text1 + number1 + " " + number2);
      }else{
        console.log(text2 + number1 + " " + number2);
      }
  }

  after(async function() {
    await driver.quit();
  });
});