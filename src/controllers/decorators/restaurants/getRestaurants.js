module.exports = () => {
  const prepare = (restaurants = []) => {
    const prepareRestaurant = (({
      id, name, rating, imageUrl, latitude, longitude, street, streetNumber, city, isOpen,
    }) => ({
      id,
      name,
      rating,
      imageUrl,
      location: {
        latitude,
        longitude,
      },
      address: {
        street,
        number: streetNumber,
        city,
      },
      isOpen,
    }));

    return restaurants.map(prepareRestaurant);
  };

  return { prepare };
};
