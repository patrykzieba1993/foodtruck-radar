exports.up = knex => knex.schema.createTable('Socials', (t) => {
  t.increments('id').unsigned().primary();
  t.integer('restaurantId').notNull();
  t.integer('socialTypeId').notNull();
  t.string('url').nullable();
  t.float('rating').nullable();

  t.dateTime('createdAt').notNull().defaultTo(knex.fn.now());
  t.dateTime('updatedAt').notNull().defaultTo(knex.fn.now());

  t.foreign('restaurantId').references('id').inTable('Restaurants');
  t.foreign('socialTypeId').references('id').inTable('SocialTypes');
});

exports.down = knex => knex.schema.dropTable('Socials');
