exports.up = knex => knex.schema.createTable('Restaurants', (t) => {
  t.increments('id').unsigned().primary();
  t.text('name').notNull();
  t.float('rating').nullable();
  t.text('imageUrl').nullable();
  t.float('latitude').nullable();
  t.float('longitude').nullable();
  t.text('street').nullable();
  t.text('streetNumber').nullable();
  t.text('city').nullable();
  t.boolean('isOpen').notNull().defaultTo(false);
  t.dateTime('createdAt').notNull().defaultTo(knex.fn.now());
  t.dateTime('updatedAt').notNull().defaultTo(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable('Restaurants');
