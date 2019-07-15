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
    await driver.get('http://localhost/litecart/admin/?app=countries&doc=countries');
    await driver.findElement(By.name('username')).sendKeys('admin');
    await driver.findElement(By.name('password')).sendKeys('admin');
    await driver.findElement(By.name('login')).click();
  });
  
  
  it('test', async function() {
    var locator = By.css('.dataTable .row');
    await driver.wait(until.elementLocated(locator), timeout).then(async function() {
      await driver.findElements(locator).then(async function(elements) {
        var count = 0, countries = [], countriesSort = [], countGeozones, linksGeozones = [], countLinks = 0;
        for(var i=2; i<=(elements.length+1); i++){
              countries[count] = await driver.findElement(By.css(".dataTable .row:nth-child(" + i + ") td:nth-child(5) a")).getText();
              count++;

              countGeozones = await driver.findElement(By.css(".dataTable .row:nth-child(" + i + ") td:nth-child(6)")).getText();
              if(countGeozones > 0){
                driver.findElement(By.css(".dataTable .row:nth-child(" + i + ") td:nth-child(5) a")).getAttribute("href").then(function(attr){
                  linksGeozones[countLinks] = attr;
                  countLinks++;
                });
                
              }
        }
        countriesSort = countries;
        
        arrSort(countriesSort);
        
        for(var j=0; j<countries.length; j++){
          if(countriesSort[j] != countries[j]){
            console.log("Страны расположены не в алфавитном порядке" + countriesSort[j] + " " + countries[j]);
          }
        }

      /***********/
      
      if(linksGeozones.length != 0){
        for(var z=0; z<linksGeozones.length; z++){
          driver.get(linksGeozones[z]);
              await driver.findElements(By.css('#table-zones tr')).then(async function(geozones) {
                var countGeo = 0, geozonesSort=[];
                for(var b=2; b<=geozones.length; b++){
                  geozones[countGeo] = await driver.findElement(By.css("#table-zones tr:nth-child(" + b + ") td:nth-child(3)")).getText();
                  countGeo++;
                }
                geozonesSort = geozones;
        
                arrSort(geozonesSort);
                
                for(var c=0; c<geozones.length; c++){
                  if(geozonesSort[c] != geozones[c]){
                    console.log("Страны расположены не в алфавитном порядке" + geozonesSort[c] + " " + geozones[c]);
                  }
                }


              });
        }
      }
  
      });
    });
  });

  function arrSort(arrSort){
    var collator = new Intl.Collator();
        arrSort.sort(function(a, b) {
          return collator.compare(a, b);
    });
  }
  after(async function() {
    await driver.quit();
  });
});