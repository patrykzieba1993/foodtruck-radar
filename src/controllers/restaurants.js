module.exports = (repository, decorators, errorHandler) => {
  const { getRestaurants: getRestaurantsDecorator } = decorators;

  const getRestaurants = async (req, res) => {
    const { query: { limit, offset, order } } = req;

    try {
      const result = await repository.getAll({ limit, offset, order });

      res.send(getRestaurantsDecorator.prepare(result));
    } catch (e) {
      errorHandler.handleCustom(e, res);
    }
  };

  return { getRestaurants };
};
