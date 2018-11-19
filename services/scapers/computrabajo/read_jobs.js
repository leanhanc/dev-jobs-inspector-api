module.exports = async page => {
  await page
    .waitForSelector('.iO', {
      timeout: 3000
    })
    .catch(e => {
      return e;
    });

  const computrabajo_jobs = await page.evaluate(async () => {
    // Buscar el contenedor de cada aviso

    const jobs = [];
    const parents = await document.querySelectorAll('.iO');

    /* Guardar el título, la ubicacación, la URL del anuncio
    y la agencia o empresa que lo publicó*/

    await parents.forEach(async parent => {
      /* Chequear si el aviso se publicó hoy, si no es de hoy, saltearlo*/
      const date = parent.querySelector('.dO').innerText.split(',')[0];
      if (!date.trim().startsWith('Hoy')) {
        return;
      }
      let json = {};
      /* Por alguna razón, Computrabajo trata distino a "Kaizen Recursos Humanos",
      no lo wrapea en un link como al resto, por eso se trata
      ese caso de manera especial" */
      json.publisher =
        parent.querySelector('span a.it-blank').innerText ||
        'Kaizen Recursos Humanos';

      const [, , location] = parent.querySelectorAll('span a');
      /*Si el trabajo figura como "Buenos Aires-GBA", guardarlo como "Buenos Aires" */
      json.location = location.innerText.split('-')[0];

      json.title = parent.querySelector('h2.tO').innerText;
      json.url = parent.querySelector('h2.tO > a').href;

      jobs.push(json);
    });
    return jobs;
  });
  return computrabajo_jobs;
};
