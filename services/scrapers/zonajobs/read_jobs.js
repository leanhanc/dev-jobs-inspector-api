module.exports = async page => {
  // Ordenar trabajos por "más recientes"
  await page.waitForSelector('a.btn.switch-btn');
  const selector = await page.$$('a.btn.switch-btn');
  selector[1].click();

  await page.waitForNavigation({ waitUntil: 'networkidle2' });

  const zonajobs_jobs = await page.evaluate(async () => {
    // Buscar el contenedor de cada aviso
    const jobs = [];
    const parents = await document.querySelectorAll('.aviso');
    /* Guardar el nombre del portal,título, la ubicacación,
     la URL, la fecha de publicación y la agencia o empresa que lo publicó*/
    await parents.forEach(async parent => {
      /* Chequear si el aviso se publicó hoy, si no es de hoy, saltearlo*/
      const date = parent.querySelector('.z-fecha').innerText;
      if (!date.includes('HORAS')) {
        return;
      }
      let json = {};
      json.site = 'Zonajobs';
      json.title = parent.querySelector('.titulo-aviso').innerText;
      json.publisher = parent.querySelector('.nombre').innerText;
      json.url = parent.querySelector('.col-sm-9.col-md-10.wrapper>a').href;
      json.location =
        parent.querySelectorAll(
          '.col-sm-9.col-md-10.wrapper .ubicacion_link > .ubicacion'
        )[0].innerText +
        parent.querySelectorAll(
          '.col-sm-9.col-md-10.wrapper .ubicacion_link > .ubicacion'
        )[1].innerText;

      if (json.location.includes('Capital')) {
        json.location = 'Capital Federal';
      } else {
        json.location = json.location.split(',')[1];
      }

      jobs.push(json);
    });
    return jobs;
  });
  return zonajobs_jobs;
};
