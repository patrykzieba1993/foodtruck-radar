exports.up = knex => knex.schema.createTable('SocialTypes', (t) => {
  t.increments('id').unsigned().primary();
  t.string('name').notNull();
  t.integer('maxRating').notNull();
});

exports.down = knex => knex.schema.dropTable('SocialTypes');
