exports.up = knex => knex.schema.alterTable('Restaurants', (t) => {
  t.string('phone').nullable();
  t.string('website').nullable();
  t.string('latestUpdates', 5000).nullable();
});

exports.down = knex => knex.schema.alterTable('Restaurants', (t) => {
  t.dropColumn('phone');
  t.dropColumn('website');
  t.dropColumn('latestUpdates');
});
