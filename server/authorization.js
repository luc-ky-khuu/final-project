const jwt = require('jsonwebtoken');
const ClientError = require('./client-error');

function authorization(req, res, next) {
  try {
    const token = req.get('X-Access-Token');
    if (!token) {
      throw new ClientError(401, 'authentication required');
    }
    const payload = jwt.verify(token, process.env.JSON_PRIVATE_TOKEN);
    req.userInfo = payload;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authorization;
