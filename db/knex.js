const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile.js');
const environmentConfig = config[environment];
const knex = require('knex');

module.exports = knex(environmentConfig);
