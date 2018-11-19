/**
 * Hacer el scrapping de la descripción en detalle
 */

module.exports = async (jobs, page) => {
  for (const job of jobs) {
    await page.goto(job.url);
    await page.waitForSelector('.aviso_description');

    // Quitar disclaimer

    await page.evaluate(async () => {
      const disclaimer = await page.$('.disclaimer');
      const description_container = await page.$('.aviso_description');
      description_container.removeChild(disclaimer);
    });

    // Tomar la descripción del trabajo
    const description = await page.$eval(
      '.aviso_description',
      e => e.innerText
    );
    job.description = description;
    console.log(job);
    return job;
  }
};
