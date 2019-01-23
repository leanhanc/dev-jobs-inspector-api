module.exports = async (page, query) => {
  // Tipear consulta
  const searchInput = await page.$('#query');
  await searchInput.focus();
  await searchInput.type(query);

  // Enviar consulta
  setTimeout(async () => {
    const searchButton = await page.$('#searchBtn');
    await searchButton.click();
  }, 1000);

  return page;
};
