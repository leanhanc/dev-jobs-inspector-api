module.exports = jobs => {
  return jobs.map(job => {
    // Normalizar a "Capital Federal", "Buenos Aires" o nombre de Provincia
    if (job.location.includes('Capital')) {
      job.location = job.location.split(',')[0].trim();
      return job;
    } else {
      job.location = job.location.split(',')[1];
      return job;
    }
  });
};
