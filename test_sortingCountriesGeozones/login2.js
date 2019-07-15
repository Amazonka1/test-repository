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
    await driver.get('http://localhost/litecart/admin/?app=geo_zones&doc=geo_zones');
    await driver.findElement(By.name('username')).sendKeys('admin');
    await driver.findElement(By.name('password')).sendKeys('admin');
    await driver.findElement(By.name('login')).click();
  });
  
  
  it('test', async function() {
    var locator = By.css('.dataTable .row');
    await driver.wait(until.elementLocated(locator), timeout).then(async function() {
      await driver.findElements(locator).then(async function(elements) {
        var linksCountries = [], countLinks = 0;
        for(var i=2; i<=(elements.length+1); i++){
              
           await driver.findElement(By.css(".dataTable .row:nth-child(" + i + ") td:nth-child(3) a")).getAttribute("href").then(async function(attr){
                  linksCountries[countLinks] = attr;
                  countLinks++;
            });
        }
        
        if(linksCountries.length != 0){
          for(var d=0; d<linksCountries.length; d++){
              driver.get(linksCountries[d]);
              await driver.findElements(By.css("#table-zones tr")).then(async function(geoZones){
                  var listGeoZones = [], countGeoZone = 0, listGeoZonesSort = [];
                  for(var y=2; y<geoZones.length; y++){
                    listGeoZones[countGeoZone] = await driver.findElement(By.css("#table-zones tr:nth-child(" + y + ") td:nth-child(3) select option[selected=selected]")).getText();
                    countGeoZone++;                   
                  }
                  listGeoZonesSort = listGeoZones;
                  arrSort(listGeoZonesSort);
                
                for(var c=0; c<listGeoZones.length; c++){
                  if(listGeoZonesSort[c] != listGeoZones[c]){
                    console.log("Страны расположены не в алфавитном порядке" + listGeoZonesSort[c] + " " + listGeoZones[c]);
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