module.exports = async (page, query) => {
  // Tipear consulta
  const searchInput = await page.$('#sq');
  await searchInput.focus();
  await searchInput.type(query);

  // Enviar consulta
  const searchButton = await page.$('#search');
  await searchButton.click();

  return page;
};
