module.exports = (repository, decorators, errorHandler) => {
  const { getRestaurants: getRestaurantsDecorator } = decorators;

  const getRestaurants = async (req, res) => {
    const {
      query: {
        limit, offset, order, query, ids,
      },
    } = req;

    if (query === '') {
      return res.send([]);
    }

    try {
      const result = await repository.getAll({
        limit, offset, order, query, ids,
      });

      return res.send(getRestaurantsDecorator.prepare(result));
    } catch (e) {
      return errorHandler.handleCustom(e, res);
    }
  };

  return { getRestaurants };
};
