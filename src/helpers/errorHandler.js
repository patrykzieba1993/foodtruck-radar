const Boom = require('boom');

module.exports = ({ nodeEnv }) => {
  const sendError = (e, code, message, res) => {
    res.status(code);

    return res.send(Boom.create(code, message).output.payload);
  };

  const showError = (e) => {
    if (nodeEnv !== 'development') {
      return;
    }

    console.log(e); // eslint-disable-line no-console
  };

  const handleJoi = (e, res) => {
    const { statusCode, payload: { message } } = e.output;

    showError(e);

    res.status(statusCode);

    return res.send(Boom.create(statusCode, message).output.payload);
  };

  const handleCustom = (e, res) => {
    const { code, message } = e;

    showError(e);

    if (!code) {
      return sendError(e, 500, message, res);
    }

    const parsedCode = parseInt(code, 10);

    if (parsedCode && !isNaN(parsedCode) && (parsedCode < 100 || parsedCode > 511)) {
      return sendError(e, 500, message, res);
    }

    return sendError(e, parsedCode, message, res);
  };

  return { handleJoi, handleCustom };
};
