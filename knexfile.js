// knexfile for this specific project (Don't forget to change username and password as needed)

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
