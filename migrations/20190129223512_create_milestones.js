
exports.up = function(knex, Promise) {
  return knex.schema.createTable('milestones', function (table) {
    table.increments('id');
    table.string('description').notNullable();
    table.date('date_acheieved').notNullable();

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('milestones');
};
