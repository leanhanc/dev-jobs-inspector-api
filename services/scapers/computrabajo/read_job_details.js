/**
 * Hacer el scrapping de la descripción en detalle
 */

module.exports = async (jobs, page) => {
  for (const job of jobs) {
    await page.goto(job.url);
    await page.waitForSelector('.p0.m0');

    const description = await page.$eval('.p0.m0>li', e => e.innerText);
    job.description = description;
    return job;
  }
};
