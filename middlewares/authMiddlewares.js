const jwt = require('jsonwebtoken');
const { AppError } = require('../helpers');
const { User } = require('../models');
const {Session} = require('../models');

const authMiddleware = async (req, res, next) => {
  try {
  const { authorization } = req.headers; 
  
    if (!authorization) {
      next(
          AppError.NotAuthorizedError(
          'Please, provide a token in request authorization header',
        ),
      );
    }
 const [tokenType, acces_token] = authorization.split(' ');

    if (tokenType !== 'Bearer') {
      next(AppError.NotAuthorizedError('Invalid token'));
    }

    if (!acces_token) {
      next(AppError.NotAuthorizedError('Please, provide a token'));
    }

    const verify = jwt.verify(acces_token, process.env.ACCES_TOKEN_SECRET);
  
    if (!verify) {
      next(AppError.NotAuthorizedError('Invalid token'));
    }

    const user = await User.findById((verify).uid);
    const session = await Session.findById((verify).sid);
    if (!user ) {
      next(AppError.NotAuthorizedError('Invalid user'));
    }
    if (!session) {
      next(AppError.NotAuthorizedError('Invalid session'));
    }

    req.user = user;
    req.session = session;
    next();
  } catch (error) {
    next(AppError.NotAuthorizedError('User not authorized'))
  }
};

module.exports = {
  authMiddleware,
};
