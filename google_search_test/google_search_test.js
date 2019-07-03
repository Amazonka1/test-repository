var webdriver = require('selenium-webdriver'),
    test = require('selenium-webdriver/testing');

describe('Google Search', function() {
  var driver;

  before(function() {
    driver = new webdriver.Builder()
        .forBrowser("chrome")
        .build();
  });

  it('opening page', function() {
    driver.get('http://yandex.ru');
  });

  after(function() {
    driver.quit();
  });
});