const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({
      message: 'Unauthorized'
    });
  }

  try {
    const jwtToken = jwt.verify(token, config.get('jwtSecret'));

    req.user = jwtToken.user;

    next();
  } catch (err) {
    return res.status(401).json({
      message: 'Invalid token'
    });
  }
}