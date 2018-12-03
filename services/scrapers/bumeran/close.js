module.exports = async browser => {
  setTimeout(() => {
    browser.close();
  }, 500);
  return browser;
};
