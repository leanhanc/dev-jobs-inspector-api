module.exports = async (page, query) => {
  // Tipear consulta
  const searchInput = await page.$('#query');
  await searchInput.focus();
  await searchInput.type(query);

  // Enviar consulta

  const searchButton = await page.$('#searchBtn');
  await searchButton.click();

  return page;
};
