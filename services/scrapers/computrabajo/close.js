module.exports = async browser => {
  setTimeout(() => {
    browser.close();
  }, 2000);
  return browser;
};
