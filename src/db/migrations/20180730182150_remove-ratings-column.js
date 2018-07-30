exports.up = knex => knex.schema.alterTable('Restaurants', (t) => {
  t.dropColumn('rating');
});

exports.down = knex => knex.schema.alterTable('Restaurants', (t) => {
  t.float('rating').nullable();
});
