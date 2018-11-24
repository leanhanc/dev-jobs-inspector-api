module.exports = async browser => {
  setTimeout(() => {
    browser.close();
  }, 1000);
  return browser;
};
