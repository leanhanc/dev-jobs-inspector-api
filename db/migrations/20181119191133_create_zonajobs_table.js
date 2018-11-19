exports.up = function(knex, Promise) {
  return knex.schema.createTable('zonajobs', table => {
    table.increments();
    table.string('location');
    table.text('title').notNullable();
    table.text('url').notNullable();
    table.text('description').notNullable();
    table.string('publisher').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());

    // Constraints
    table.unique('url');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('zonajobs');
};
