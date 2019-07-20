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
    await driver.get('http://localhost/litecart/admin/?category_id=0&app=catalog&doc=edit_product');
    await driver.findElement(By.name('username')).sendKeys('admin');
    await driver.findElement(By.name('password')).sendKeys('admin');
    await driver.findElement(By.name('login')).click();
  });
  
  
  it('test', async function() {
    var locator = By.css("#tab-general");
    await driver.wait(until.elementLocated(locator), timeout).then(async function() {
      await driver.findElements(locator).then(async function(elements) {
            //вкладка General

            //статус
            await driver.findElement(By.css("#tab-general input[name='status'][value='1']")).click();

            //название товара
            await driver.findElement(By.css("#tab-general input[name='name[en]']")).sendKeys('Blue horse');

            //артикуль
            await driver.findElement(By.css("#tab-general input[name='code']")).sendKeys('rd00100');

            //категории
            await driver.findElement(By.css("#tab-general input[name='categories[]'][checked='checked']")).click();
            await driver.findElement(By.css("#tab-general input[name='categories[]'][value='1']")).click();

            //Дефолтная категория
            await selectValue("#tab-general select[name='default_category_id']", 0);

            //Пол
            await driver.findElement(By.css("#tab-general input[name='product_groups[]'][value='1-3']")).click();

            //Количество товаров
            await driver.findElement(By.css("#tab-general input[name='quantity']")).clear();
            await driver.findElement(By.css("#tab-general input[name='quantity']")).sendKeys("100");
            
            //единица измерения
            await selectValue("#tab-general select[name='quantity_unit_id']", 1);

            //Статус доставки
            await selectValue("#tab-general select[name='delivery_status_id']", 1);
            
            //Статус распродажи
            await selectValue("#tab-general select[name='sold_out_status_id']", 2);
                        
            //Загрузить изображение
            var pathImage = process.cwd()+'/image-l6z12/blue_horse.jpg';
            await driver.findElement(By.css("#tab-general input[name='new_images[]']")).sendKeys(pathImage);
            
            // дата действительна с 
            await driver.findElement(By.css("#tab-general input[name='date_valid_from']")).sendKeys("25.07.2019");

            // дата действительна по
            await driver.findElement(By.css("#tab-general input[name='date_valid_to']")).sendKeys("30.07.2019");

            // Переход на вкдадку Information
            await driver.findElement(By.css("a[href='#tab-information']")).click();
            await driver.sleep(1000);
            
            //Вкладка Information
                        
            //Производитель
            await selectValue("#tab-information select[name='manufacturer_id']", 1);

            //Поставщик
            await selectValue("#tab-information select[name='supplier_id']", 0);

            //Ключевые слова
            await driver.findElement(By.css("#tab-information input[name='keywords']")).sendKeys("Jumping toy, horse");

            //Краткое описание
            await driver.findElement(By.css("#tab-information input[name='short_description[en]']")).sendKeys("The toy jumper is designed for small children who do not sit still and like to jump on something.");

            //Описание
            await driver.findElement(By.css("#tab-information .trumbowyg-editor")).sendKeys("Wonderful toy jumper Horse is designed for small children who do not sit still and love to jump on something. The baby will be comfortable sitting on this horse. She is very comfortable. Also, the baby can hold the ears of the horse when it jumps.");

            //Заголовок
            await driver.findElement(By.css("#tab-information input[name='head_title[en]']")).sendKeys("Jumping toy, blue horse");

            //Meta описание
            await driver.findElement(By.css("#tab-information input[name='meta_description[en]']")).sendKeys("Jumping toy Horse is designed for small children who do not sit still and love to jump on something.");

            // Переход на вкдадку Prices
            await driver.findElement(By.css("a[href='#tab-prices']")).click();
            await driver.sleep(1000);

            //Вкладка Prices

            //Цена
            await driver.findElement(By.css("#tab-prices input[name='purchase_price']")).clear();
            await driver.findElement(By.css("#tab-prices input[name='purchase_price']")).sendKeys("22");

            //Валюта
            await selectValue("#tab-prices select[name='purchase_price_currency_code']", 1);

            //Tax class
            await selectValue("#tab-prices select[name='tax_class_id']", 0);

            //Price Incl. Tax
            await driver.findElement(By.css("#tab-prices input[name='prices[USD]']")).sendKeys("27");

            await driver.findElement(By.css("button[name='save']")).click();
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