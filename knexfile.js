// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'team_picker',
      username: 'user-nimbus',
      password: '123'
    },
    migrations: {
      tableName: 'migrations',
      directory: 'db'
    },

  },

};
