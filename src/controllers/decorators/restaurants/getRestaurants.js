module.exports = () => {
  const prepare = (restaurants = []) => {
    const prepareRestaurant = (({
      id, name, imageUrl, latitude, longitude, street, streetNumber, city, isOpen,
      phone, website, latestUpdates, socialUrl, rating, socialType, maxRating, opens, closes,
    }) => ({
      id,
      name,
      socials: [
        {
          type: socialType,
          url: socialUrl,
          rating,
          maxRating,
        },
      ], // what if more...
      contact: {
        phone,
        website,
      },
      logo: {
        small: imageUrl, // convert
        big: imageUrl,
      },
      coordinates: {
        latitude,
        longitude,
      },
      address: {
        street,
        number: streetNumber,
        city,
      },
      latestUpdates,
      openingHours: {
        opens,
        closes,
      },
      isOpen,
    }));

    return restaurants.map(prepareRestaurant);
  };

  return { prepare };
};
