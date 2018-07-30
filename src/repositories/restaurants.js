const { TableNames: { restaurants } } = require('./../utils/const');

module.exports = (db) => {
  const embraceWithQuotes = value => (value[0] === '"' && value[value.length - 1] === '"' ? value : `"${value}"`);

  const getAll = ({
    limit, offset, query, ids, order = 'id ASC',
  }) => {
    const orderStrategy = `${embraceWithQuotes('Restaurants')}.${embraceWithQuotes(order.split(' ')[0])} ${order.split(' ')[1]}`;

    return db(restaurants)
      .select([
        'Restaurants.*',
        'Socials.url as socialUrl', 'Socials.rating',
        'SocialTypes.name as socialType', 'SocialTypes.maxRating',
        'OpeningHoursRules.opens', 'OpeningHoursRules.closes',
      ])
      .join('Socials', 'Restaurants.id', 'Socials.restaurantId')
      .join('SocialTypes', 'SocialTypes.id', 'Socials.socialTypeId')
      .join('OpeningHoursRules', 'Restaurants.id', 'OpeningHoursRules.restaurantId')
      .orderByRaw(orderStrategy)
      .modify((q) => {
        if (!isNaN(limit)) {
          q.limit(limit);
        }

        if (!isNaN(offset)) {
          q.offset(offset);
        }

        if (query) {
          q.whereRaw(`LOWER("Restaurants"."name") like '%${query.toLowerCase()}%'`);
        }

        if (Array.isArray(ids)) {
          q.whereIn('Restaurants.id', ids);
        }
      });
  };

  return { getAll };
};
