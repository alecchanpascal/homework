// Client export file for knex using the dev config
const knex = require('knex');
const developmentConfig = require('./knexfile').development;
const client = knex(developmentConfig)
module.exports = client;