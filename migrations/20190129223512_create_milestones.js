
exports.up = function(knex, Promise) {
  return knex.schema.createTable('milestones', function (table) {
    table.increments('id');
    table.string('description').notNullable();
    table.date('date_acheieved').notNullable();
    table.integer('famous_person_id').notNullable();
    table.foreign('famouse_person_id').references('famous_people');

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('milestones');
};
