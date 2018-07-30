exports.up = knex => knex.schema.createTable('OpeningHoursRules', (t) => {
  t.increments('id').unsigned().primary();
  t.integer('restaurantId').notNull();
  t.string('opens').notNull();
  t.string('closes').notNull();
  t.integer('numberOfDay').nullable(); // for extra rules (saturdays/sundays, national holidays etc.)

  t.dateTime('createdAt').notNull().defaultTo(knex.fn.now());
  t.dateTime('updatedAt').notNull().defaultTo(knex.fn.now());

  t.foreign('restaurantId').references('id').inTable('OpeningHoursRules');
});

exports.down = knex => knex.schema.dropTable('OpeningHoursRules');
