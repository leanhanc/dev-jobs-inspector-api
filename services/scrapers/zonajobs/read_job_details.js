/**
 * Hacer el scrapping de la descripción en detalle
 */

module.exports = async (jobs, page) => {
  await page.waitFor(1000);

  for (const job of jobs) {
    await page.goto(job.url);

    await page.waitForSelector('.disclaimer');

    await page.waitFor(1000);

    // Quitar disclaimer
    await page.evaluate(async () => {
      const disclaimer = document.querySelector('.disclaimer');
      const description_container = document.querySelector(
        '.aviso_description'
      );
      description_container.removeChild(disclaimer);
    });

    // Tomar la descripción del trabajo
    const description = await page.$eval(
      '.aviso_description',
      e => e.innerText
    );
    job.description = description;
  }
  return jobs;
};
