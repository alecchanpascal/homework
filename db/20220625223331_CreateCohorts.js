/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
//Function to create the cohorts table
exports.up = function(knex) {
    return knex.schema.createTable('cohorts', table => {
        table.increments('id');
        table.string('imageUrl');
        table.string('name');
        table.text('members');
        table.timestamp('createdAt').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
//Function to delete the cohorts table
exports.down = function(knex) {
  return knex.schema.dropTable('cohorts');
};
